import { Card, CardMedia, Table, TableBody, TableCell, TableRow } from "@mui/material";

const ContentCard = ({ place }) => {
  return (
    <Card elevation={4} sx={{
      borderRadius: '10px',
      maxWidth: 350,
      height: 450
    }}>
    {place.imageUrl && <CardMedia component="img" sx={{height: 200, objectFit: "cover"}} image={place.imageUrl} alt="Place" />}
      <Table sx={{
        height: "250px",
        overflowY: "scroll",
        display:'block'
      }}>
        <TableBody>
          {Object.entries(place).map(([key, value]) => (
            key !== 'imageUrl' && <TableRow key={key} sx={{}}>
              <TableCell>{<b>{key}</b>}</TableCell>
              <TableCell>{key === 'budget'? value + ' INR' : value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ContentCard;
