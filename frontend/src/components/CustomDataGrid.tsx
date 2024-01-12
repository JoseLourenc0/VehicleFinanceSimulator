import { DataGrid, GridColDef, GridInitialState, GridRowsProp, GridToolbar, useGridApiRef } from '@mui/x-data-grid'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

const CustomDataGrid: (props: { rows: GridRowsProp, cols: GridColDef[] }) => JSX.Element = ({ rows, cols }) => {
    const [DATA_GRID, setDATA_GRID] = useState<null | { rows: GridRowsProp, cols: GridColDef[] }>(null)

    const apiRef = useGridApiRef();

    const [initialState, setInitialState] = useState<GridInitialState>();


    const saveSnapshot = useCallback(() => {
        if (apiRef?.current?.exportState && localStorage) {
            const currentState = apiRef.current.exportState();
            localStorage.setItem('dataGridState', JSON.stringify(currentState));
        }
    }, [apiRef]);

    useLayoutEffect(() => {
        const stateFromLocalStorage = localStorage?.getItem('dataGridState');
        setInitialState(stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : {});

        window.addEventListener('beforeunload', saveSnapshot);

        return () => {
            window.removeEventListener('beforeunload', saveSnapshot);
            saveSnapshot();
        };
    }, [saveSnapshot]);


    useEffect(() => {
        if (rows) setDATA_GRID({ rows: rows, cols: cols })
    }, [rows])


    return (
        <>
            {
                DATA_GRID &&
                <DataGrid
                    apiRef={apiRef}
                    disableColumnFilter
                    // disableColumnSelector
                    disableDensitySelector
                    rows={rows}
                    columns={cols}
                    pageSizeOptions={[5, 10, 25, 50]}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true
                        }
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5
                            }
                        }, ...initialState
                    }} />
            }
        </>
    )
}

export default CustomDataGrid
