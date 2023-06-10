import React from 'react';
import { useTable } from 'react-table';
import StatusMessage from '../statusmessage';
import {Segment, Icon} from 'semantic-ui-react';
import './styles.css';

function DocumentTable(props) {
    const data = React.useMemo(() => props.data, [props.data]);
    const columns = React.useMemo(() => props.columns, [props.columns]);

    console.log(`JOSH - DocumentTable data: ${data}`)

    if (!data || data.length === 0) {
        return (
            <StatusMessage
            error={error || !data}
            errorClassName="document-table-error"
            errorMessage={`No data to display`}
            loading={isLoading}
            loadingMessage={`We are fetching the documents for you`}
            nothing={data && data.length === 0}
            nothingMessage={`No data to display`}
            nothingClassName="document-table-error"
            type="default"
          />
        );
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div className="document-table-container">
            <div className="document-table-title">
                <Icon name={'file outline'} />
                {"Placeholder - needs to be a title for a world for example"}
            </div>
            <table className="document-table" {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
    );
}

export default DocumentTable;