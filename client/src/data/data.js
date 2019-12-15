import React from "react";
import moment from "moment";

//events/hourly
export const hourlyEvents = {
  headerRow: ["Date", "Hour", "Events"],
  renderBodyRow: ({ date, hour, events }, i) => {
    return {
      key: i,
      cells: [
        {
          key: "date",
          content: moment(date).format("DDD MMMM YYYY")
        },
        { key: "hour", content: hour },
        { key: "events", content: events }
      ]
    };
  },
  chartTransform: (data) => {
    const transformedData = data.map((point) => {
      return { x: moment(point.date).add(point.hour, "h"), y: point.events };
    });
    return {
      options: {
        animation: {
          duration: 1000 // general animation time
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day"
              }
            }
          ]
        }
      },
      datasets: {
        datasets: [
          {
            label: "Events",
            data: transformedData
          }
        ]
      }
    };
  }
};

//events/daily
export const dailyEvents = {
  headerRow: ["Date", "Events"],
  renderBodyRow: ({ date, events }, i) => {
    return {
      key: i,
      cells: [
        {
          key: "date",
          content: moment(date).format("DDD MMMM YYYY")
        },
        { key: "events", content: events }
      ]
    };
  },
  chartTransform: (data) => {
    const transformedData = data.map((point) => {
      return { x: moment(point.date), y: point.events };
    });
    return {
      options: {
        animation: {
          duration: 1000 // general animation time
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day"
              }
            }
          ]
        }
      },
      datasets: {
        datasets: [
          {
            label: "Events",
            data: transformedData
          }
        ]
      }
    };
  }
};

//stats/hourly
export const hourlyStats = {
  headerRow: ["Date", "Hour", "Impressions", "Clicks", "Revenue"],
  renderBodyRow: ({ date, hour, impressions, clicks, revenue }, i) => {
    return {
      key: i,
      cells: [
        {
          key: "date",
          content: moment(date).format("DDD MMMM YYYY")
        },
        { key: "hour", content: hour },
        { key: "impressions", content: impressions },
        { key: "clicks", content: clicks },
        { key: "revenue", content: revenue }
      ]
    };
  },
  chartTransform: (data) => {
    const transformedDataImpressions = data.map((point) => {
      return { x: moment(point.date).add(point.hour, "h"), y: point.impressions };
    });
    const transformedDataClicks = data.map((point) => {
      return { x: moment(point.date).add(point.hour, "h"), y: point.clicks };
    });
    const transformedDataRevenue = data.map((point) => {
      return { x: moment(point.date).add(point.hour, "h"), y: point.revenue };
    });
    return {
      options: {
        animation: {
          duration: 1000 // general animation time
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        }
      },
      datasets: {
        datasets: [
          {
            label: "Impressions",
            data: transformedDataImpressions,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            hidden: true
          },
          {
            label: "Clicks",
            data: transformedDataClicks,
            backgroundColor: "rgba(255, 206, 86, 0.2)"
          },
          {
            label: "Revenue",
            data: transformedDataRevenue,
            backgroundColor: "rgba(153, 102, 255, 0.2)"
          }
        ]
      }
    };
  }
};

//stats/daily
export const dailyStats = {
  headerRow: ["Date", "Impressions", "Clicks", "Revenue"],
  renderBodyRow: ({ date, impressions, clicks, revenue }, i) => {
    return {
      key: i,
      cells: [
        {
          key: "date",
          content: moment(date).format("DDD MMMM YYYY")
        },
        { key: "impressions", content: impressions },
        { key: "clicks", content: clicks },
        { key: "revenue", content: revenue }
      ]
    };
  },
  chartTransform: (data) => {
    const transformedDataImpressions = data.map((point) => {
      return { x: moment(point.date), y: point.impressions };
    });
    const transformedDataClicks = data.map((point) => {
      return { x: moment(point.date), y: point.clicks };
    });
    const transformedDataRevenue = data.map((point) => {
      return { x: moment(point.date), y: point.revenue };
    });
    return {
      options: {
        animation: {
          duration: 1000 // general animation time
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        }
      },
      datasets: {
        datasets: [
          {
            label: "Impressions",
            data: transformedDataImpressions,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            hidden: true
          },
          {
            label: "Clicks",
            data: transformedDataClicks,
            backgroundColor: "rgba(255, 206, 86, 0.2)"
          },
          {
            label: "Revenue",
            data: transformedDataRevenue,
            backgroundColor: "rgba(153, 102, 255, 0.2)"
          }
        ]
      }
    };
  }
};
