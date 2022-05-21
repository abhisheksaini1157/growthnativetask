
import { Container } from '@mui/material';
import MUIDataTable from 'mui-datatables';

const Table = (props) => {
    const { data, columns } = props;

    return (
        <Container maxWidth="lg">
            <MUIDataTable
                data={data}
                columns={columns}
                options={{
                    exportButton: true,
                    filterType: 'dropdown',
                    selectableRows: 'none',
                    rowsPerPageOptions: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
                    responsive: 'standard'
                }}
            />
        </Container>
    );
};

// props validation for the table

const PropTypes = require('prop-types');

Table.propTypes = {
    data: PropTypes.array.isRequired,

    columns: PropTypes.array.isRequired
};

export default Table;
