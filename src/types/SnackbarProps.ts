type SnackBarProps = {
    handleClick: () => void;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setMessageType: React.Dispatch<React.SetStateAction<string>>;
  };