// Material Kit
import InfoArea from 'components/MaterialKit/InfoArea/InfoArea.js';

// Icons
import ErrorIcon from '@material-ui/icons/Error';

const Error = ({ msg }) => {
  return (
    <InfoArea
      title="On no! There's been an error!"
      description={msg}
      icon={ErrorIcon}
      iconColor="danger"
    />
  );
};

export default Error;
