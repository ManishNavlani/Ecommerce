import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function LoadingSkeleton(props) {
  return (
    <>
      <Box sx={{ width: 300, height: 420, marginTop: 4 }}>
        <Card>
          <Skeleton
            animation="wave"
            width={300}
            height={300}
            variant="rectangular"
          />
          <CardContent>
            <Skeleton
              animation="wave"
              sx={{ marginTop: 1 }}
              variant="rectangular"
            ></Skeleton>
            <Skeleton
              animation="wave"
              sx={{ marginTop: 1 }}
              variant="rectangular"
              width={50}
            />
            <Skeleton
              animation="wave"
              sx={{ marginTop: 1 }}
              variant="rectangular"
              width={100}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default LoadingSkeleton;
