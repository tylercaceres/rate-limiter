import React from "react";
import { Table, Pagination } from "semantic-ui-react";

const DefaultTable = ({ headerRow, renderBodyRow, currentData, ...props }) => {
  const [activePage, setActivePage] = React.useState(1);

  React.useEffect(() => {
    setActivePage(1);
  }, [currentData]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil(currentData.length / rowsPerPage);
  const startRow = (activePage - 1) * rowsPerPage;
  const endRow = activePage * rowsPerPage - 1;
  const activePageData = currentData.slice(startRow, endRow);

  const handlePageChange = (event, data) => {
    setActivePage(data.activePage);
  };

  const footer = (
    <Pagination activePage={activePage} totalPages={totalPages} onPageChange={handlePageChange} />
  );

  return (
    <Table
      celled
      stackable
      striped
      headerRow={headerRow}
      renderBodyRow={renderBodyRow}
      tableData={activePageData}
      footerRow={footer}
    />
  );
};

export default DefaultTable;
