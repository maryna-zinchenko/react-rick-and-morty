import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexShrink: 0,
    width: 235,
    transition: 'all 1s',
    '&:hover': {
      transform: `scale(1.1)`,
      boxShadow: '0px 0px 30px 13px rgba(245,255,39,0.78)',
      'z-index': 1,
      backgroundColor: 'rgba(245,255,39,0.78)',
    }
  },
  media: {
    height: 235,
  },
});

export default useStyles