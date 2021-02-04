import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: '#E6D7AF',
    color: 'gray',
    margin: theme.spacing(3),
    minWidth: 120,
    '&:hover': {
      backgroundColor: '#E6D7AF',
      boxShadow: '0px 0px 15px 1px rgba(245,255,39,0.78)',
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
}));

export default useStyles;
