import Button from '../Button/Button';
import './DeleteAccountWarning.scss';

interface DeleteAccountProps {
  setMainView: (arr: string) => void;
  onDeleteButton: () => void;
}

const DeleteAccountWarning: React.FC<DeleteAccountProps> = ({
  setMainView,
  onDeleteButton,
}) => {
  return (
    <div className="delete-account">
      <h2>Are you shure, you want to delete your account?</h2>
      <div>
        <Button onClick={() => setMainView('main')}>Cancel</Button>
        <Button onClick={onDeleteButton}>Delete</Button>
      </div>
    </div>
  );
};

export default DeleteAccountWarning;
