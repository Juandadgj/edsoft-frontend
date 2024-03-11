import { styled } from '@mui/material';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import Link from 'next/link';
import { useEffect } from 'react';

const InstitutionCard = (props: any) => {
  const Row = styled('div')(({ theme }) => ({
    display: 'flex',
    borderRadius: '15px',
    overflow: 'hidden',
    marginTop: '2rem',
    backgroundColor: '#707070',
    gap: '2px',
    border: '10px solid #EFEFEF',
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
      flexDirection: 'column',
    },
  }));
  const TextCard = styled('h4')(({ theme }) => ({
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
    },
  }));
  return (
    <Link
      href={`/login?id=${props.row.original.id}&colegio=${encodeURIComponent(
        props.row.original.name
      )}`}
      style={{ textDecoration: "none", width: "100%" }}
    >
      <Row key={props.row.id}>
        {props.row.cells.map((cell: any, i: any) => (
          <TableCell
            key={i}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              border: "10px solid #EFEFEF",
              padding: "0px",
              margin: "0px",
              width: "100%",
            }}
            {...cell.getCellProps()}
            className={`bg-gray1`}
          >
            <strong>
              <TextCard className="text-black"> {cell.render("Cell")}</TextCard>
            </strong>
          </TableCell>
        ))}
      </Row>
    </Link>
  );
};

export default InstitutionCard;
