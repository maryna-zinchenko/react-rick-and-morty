import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
  root: {
    backgroundColor: '#AAFF5A',
  },
  table: {
    backgroundColor: '#E6D7AF',
    maxWidth: 700,
    margin: '0 auto',
    marginTop: '10px',
  }
}));

export default useStyles;