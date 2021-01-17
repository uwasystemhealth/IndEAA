// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CardFooter from "components/MaterialKit/Card/CardFooter.js";
import Badge from "components/MaterialKit/Badge/Badge.js";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";
import PageviewIcon from "@material-ui/icons/Pageview";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

// CUSTOM COMPONENTS
import EditModal from "./EditModal.js";
import AreYouSureButton from "components/Other/AreYouSureButton"

// STYLES
import { makeStyles } from "@material-ui/core/styles";
import {
  cardTitle,
  cardLink,
  cardSubtitle,
} from "assets/jss/nextjs-material-kit.js";

// Store Actions and Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";

const styles = { cardTitle, cardLink, cardSubtitle };
const useStyles = makeStyles(styles);

const DocumentCard = ({ document, course_id }) => {

  const {_id,name,description, link,tags} = document
  const classes = useStyles();

//   const dateString = createdDate?.toLocaleDateString("en-gb", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });

  const handleDelete = () => {
    services["course-evaluation"].patch(course_id, {
      $pull : {documents: {_id: document._id}}
    });
  };

  const badges = tags.map((eoc) => (
    <Badge key={eoc} color={eoc.includes(".") ? "info" : "primary"}>
      EOC: {eoc}
    </Badge>
  ));

  return (
    <Card>
      <CardBody>
        <GridContainer>
          <GridItem xs={8}>
            <h4 className={classes.cardTitle}>{name}</h4>
            <p>
              {description}
            </p>
            <p>
              URI:{" "}
              <a href={link} className={cardLink}>
                {link}
              </a>
            </p>
          </GridItem>
          <GridItem xs={3}>
            <GridContainer direction="column">
              <Button color="white" onClick={() => window.open(link)}>
                <PageviewIcon />
                View
              </Button>

              <EditModal document={document} course_id={course_id} />

              <AreYouSureButton buttonProps={{color:"white"}} action={handleDelete}>
                <DeleteIcon />
                Delete
              </AreYouSureButton>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>{badges}</CardFooter>
    </Card>
  );
};

export default DocumentCard;
