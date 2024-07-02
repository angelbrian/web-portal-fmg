import { FormControl, FormGroup, FormControlLabel, Checkbox, Box, Typography } from '@mui/material';

const ColorFilter = ({ selectedColors, onChange, colors }) => {
  const colorOptions = colors;

  const handleChange = (event) => {
    onChange(event.target.name, event.target.checked);
  };

  return (
    <FormControl component="fieldset">
      <FormGroup row>
        {Object.keys(colorOptions).map((colorKey) => (
          <Box key={colorKey} display="flex" alignItems="center" mx={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedColors.includes(colorKey)}
                  onChange={handleChange}
                  name={colorKey}
                  sx={{
                    color: colorOptions[colorKey].bg,
                    '&.Mui-checked': {
                      color: colorOptions[colorKey].bg,
                    },
                  }}
                />
              }
              label={<Typography>{colorKey}</Typography>}
              sx={{
                borderLeft: '2px solid gray'
              }}
            />
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: colorOptions[colorKey].bg,
                marginLeft: 1,
                borderRadius: '50%',
              }}
            />
          </Box>
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default ColorFilter;