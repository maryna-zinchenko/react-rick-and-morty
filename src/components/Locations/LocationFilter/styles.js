import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: '#E6D7AF',
    margin: theme.spacing(3),
    minWidth: 120,
    '&:hover': {
      boxShadow: '0px 0px 15px 1px rgba(245,255,39,0.78)',
    }
  },
  filters: {
    backgroundColor: '#E6D7AF',
  },
}));

export default useStyles;