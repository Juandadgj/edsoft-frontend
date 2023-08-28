import { Column, useTable } from 'react-table';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import InstitutionCard from './InstitutionCard';

type SimpleObject = { [key: string]: string | number | React.ReactNode | null };

interface DynamicTableProps {
  columns: Column<SimpleObject>[];
  data: SimpleObject[];
  filter?: string | null;
}

function DynamicTable({ columns, data }: DynamicTableProps) {
  const [active, setActive] = useState(false);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  useEffect(() => {
    setActive(true);
  }, []);

  const TableRow = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '93%',
    },
  }));
  const TableHead = styled('h4')(({ theme }) => ({
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  }));
  return (
    <TableContainer component={Paper} className="shadow-none ">
      <Table {...getTableProps()} style={{ width: '100%' }}>
        <TableHead className="col-12">
          <TableRow>
            {headerGroups[0].headers.map(column => (
              <TableCell
                key={column.id}
                className={`fs-6 text-primary opacity${active ? 'active' : ''} transitionUp ${
                  active ? 'active' : ''
                }`}
                style={{ width: 'auto', backgroundColor: 'white', borderColor: 'white' }}>
                <strong style={{ color: '#5472d4' }}>
                  {/* <u> */}
                  <big style={{ padding: '6px', fontSize: '25px' }}>{column.render('Header')}</big>
                  <hr
                    style={{
                      opacity: 'inherit',
                      backgroundColor: '#5472d4',
                      height: '3px',
                      margin: '0px',
                      marginTop: '6px',
                    }}
                  />
                  {/* </u> */}
                </strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <hr
          style={{
            opacity: 'inherit',
            backgroundColor: '#5472d4',
            height: '3px',
            margin: '0px',
            marginTop: '6px',
            border: 'none',
          }}
        />
        <TableBody
          {...getTableBodyProps()}
          className={` opacity${active ? 'active' : ''} animate-fade-left animate-duration-700 ${active ? 'active' : ''}`}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <InstitutionCard row={row}/>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DynamicTable;
