import React from 'react';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}


export default function StarRating(props) {

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Quality</Typography>
        <Rating
          name="quality"
          defaultValue={1}
          precision={0.5}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          onChange={(e)=>{
              
            props.setRevFormData({...props.rev, [e.target.name]:e.target.value})}
      }
        />
      </Box>
     
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Experience With Us</Typography>
        <Rating
          name="Experience"
          defaultValue={2}
          getLabelText={(value) => customIcons[value].label}
          IconContainerComponent={IconContainer}
          onChange={(e)=>{
              
            props.setRevFormData({...props.rev, [e.target.name]:e.target.value})}
      }
        />
      </Box>
    </div>
  );
}