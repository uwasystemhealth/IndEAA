
// Materialkit
import Button from 'components/MaterialKit/CustomButtons/Button.js';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';

const IOARow = ({ioa, removeIOA}) => {
  return (
    <div>
      <p>
        {ioa} <Button justIcon round onClick={removeIOA} color="error">
          <DeleteIcon/>
        </Button>
      </p>
    </div>
  );
};

export default IOARow;
