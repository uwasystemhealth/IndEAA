// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CardFooter from "components/MaterialKit/Card/CardFooter.js";
import Badge from "components/MaterialKit/Badge/Badge.js";

// STYLES
import { makeStyles } from "@material-ui/core/styles";
import {
  cardTitle,
  cardLink,
  cardSubtitle,
} from "assets/jss/nextjs-material-kit.js";

const styles = { cardTitle, cardLink, cardSubtitle };
const useStyles = makeStyles(styles);

const DocumentCard = ({ documentID, title, createdDate, uri, eocs }) => {
  const classes = useStyles();

  const dateString = createdDate.toLocaleDateString("en-gb", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const badges = eocs.map((eoc) => (
    <Badge key={eoc} color="info">
      EOC: {eoc}
    </Badge>
  ));

  return (
    <Card>
      <CardBody>
        <h4 className={classes.cardTitle}>{title}</h4>
        <h5 className={classes.cardSubtitle}>Added on {dateString}</h5>
        <p>
          URI:{" "}
          <a href={uri} className={cardLink}>
            {uri}
          </a>
        </p>
      </CardBody>
      <CardFooter>{badges}</CardFooter>
    </Card>
  );
};

export default DocumentCard;
