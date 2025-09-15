import React, { useState } from 'react';

const TableComponent = ({ heading, columns, rows }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const themeClasses = {
    container: isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
    card: isDarkTheme ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
    tableHeader: isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700',
    tableRow: isDarkTheme ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
  };

  const renderCellContent = (column, row) => {
    if (column.renderCell) {
      return column.renderCell({ row });
    }
    return row[column.field];
  };

  return (
    <div className={`h-full px-2 py-6 md:p-6 ${themeClasses.container}`}>
      <div className={`rounded-lg shadow-lg border ${themeClasses.card} h-full flex flex-col`}>
        {/* Header Section */}
        <div className="p-6 border-b border-opacity-20">
       
        </div>

        {/* Table Section */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className={`${themeClasses.tableHeader} sticky top-0`}>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.field}
                    className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider"
                  >
                    {column.headerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600 divide-opacity-30">
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <tr key={row._id || row.id || index} className={`transition-colors ${themeClasses.tableRow}`}>
                    {columns.map((column) => (
                      <td key={column.field} className="px-6 py-4">
                        {renderCellContent(column, row)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-16 text-center text-gray-400"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-4xl mb-4">📄</div>
                      <p className="text-lg font-medium">No data available</p>
                      <p className="text-sm opacity-75">There are no users to display at the moment.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;