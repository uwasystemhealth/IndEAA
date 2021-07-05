// Custom Components
import DesignedCheckBox  from 'components/administrator/DesignedCheckBox';

// Material Kit
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';

// Material UI
import List from '@material-ui/core/List';

const ApplyTo = ({ eocs ,eocInSame,handleCheck}) => {
  return (
    <Card>
      <CardHeader color="success">Tags</CardHeader>
      <CardBody>
        <List>
          {eocs.map((numberLabel) => (
            <DesignedCheckBox
              key={numberLabel}
              onClick={() =>handleCheck(numberLabel)}
              isChecked={ eocInSame.includes(numberLabel)}
              label={`EOC ${numberLabel}` }
            />
          ))}
        </List>
      </CardBody>
    </Card>
  );
};

export default ApplyTo;
