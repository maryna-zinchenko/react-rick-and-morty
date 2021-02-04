import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './CharacterCard.scss';
import useStyles from './useStyles';

export default function CharacterCard({ character }) {
  const classes = useStyles();

  return (
    <Popup trigger={
      <Card className={classNames(classes.root)}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={character.image}
            title={character.name}
          />
          <CardContent>
            <Typography 
              gutterBottom 
              variant="h5" 
              component="h2"
            >
              {character.name}
            </Typography>
            <Typography 
              variant="body2" 
              color="textSecondary" 
              component="p"
            >
              {character.species}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>} modal nested>
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> {character.name} </div>
          <div className="content">
            {character.species}, {character.status}. Location: {character.location.name}. Origin: {character.origin.name}
          </div>
        </div>
      )}
     </Popup>
  );
}
