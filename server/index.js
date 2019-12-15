const METHOD = 1;
//1 = regular Object method
//2 = redis method

const express = require("express");
const pg = require("pg");
require("dotenv").config();

const redis = require("redis");
const client = redis.createClient();
client.on("error", (err) => console.log(`Error: ${err}`));

const app = express();
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

//note: this reads as : maximum of 20 requests per 60 seconds
const LIMITER_INTERVAL = 60; //60 seconds
const LIMITER_MAX_COUNT = 20; //max requests per defined interval
const LIMIT_OBJ = {};

const queryHandler = (req, res, next) => {
  pool
    .query(req.sqlQuery)
    .then((r) => {
      return res.json(r.rows || []);
    })
    .catch(next);
};

/**
 *
 * note: this function can be used two different ways: method 1 or method 2
 * method 2: uses REDIS --> only set method to 2 if you have REDIS set up
 * method 1: uses regular object
 */
const limitRateHandler = (req, res, next) => {
  const ipAddress = req.ip;
  if (METHOD === 1) {
    if (LIMIT_OBJ[ipAddress]) {
      LIMIT_OBJ[ipAddress] += 1;
    } else {
      LIMIT_OBJ[ipAddress] = 1;
      setTimeout(() => {
        delete LIMIT_OBJ[ipAddress];
      }, LIMITER_INTERVAL * 1000);
    }

    if (LIMIT_OBJ[ipAddress] > LIMITER_MAX_COUNT) {
      return res
        .status(403)
        .send(
          `Maximum requests of ${LIMITER_MAX_COUNT} requests per ${LIMITER_INTERVAL} seconds has been exceeded.`
        );
    }
    return next();
  } else {
    client
      .multi()
      .set([ipAddress, 0, "EX", LIMITER_INTERVAL, "NX"])
      .incr(ipAddress)
      .exec((err, replies) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        const requestCount = replies[1];
        if (requestCount > LIMITER_MAX_COUNT) {
          return res
            .status(403)
            .send(
              `Maximum requests of ${LIMITER_MAX_COUNT} requests per ${LIMITER_INTERVAL} seconds has been exceeded.`
            );
        }
        return next();
      });
  }
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(limitRateHandler);
app.get("/", (req, res) => {
  res.send("Welcome to EQ Works 😎");
});

app.get(
  "/events/hourly",
  (req, res, next) => {
    req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `;
    return next();
  },
  queryHandler
);

app.get(
  "/events/daily",
  (req, res, next) => {
    req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `;
    return next();
  },
  queryHandler
);

app.get(
  "/stats/hourly",
  (req, res, next) => {
    req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `;
    return next();
  },
  queryHandler
);

app.get(
  "/stats/daily",
  (req, res, next) => {
    req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `;
    return next();
  },
  queryHandler
);

app.get(
  "/poi",
  (req, res, next) => {
    req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `;
    return next();
  },
  queryHandler
);

//inner join and sum daily to reduce amount of data
app.get('/poi-data',(req,res,next) => {
  req.sqlQuery = `select h_e.date as date, h_e.poi_id as poi_id, sum(events) as events, sum(impressions) as impressions, sum(clicks) as clicks, sum(revenue) as revenue
  from hourly_events h_e join hourly_stats h_s
  on h_e.date = h_s.date and h_e.hour = h_s.hour
  group by h_e.date, h_e.poi_id
  lIMIT 25`
  ;
  return next();
},queryHandler)

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`);
  }
});

// last resorts
process.on("uncaughtException", (err) => {
  console.log(`Caught exception: ${err}`);
  process.exit(1);
});
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  process.exit(1);
});
