import { 
  Box, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Switch, 
  FormControlLabel,
  Button,
  IconButton,
  Grid,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { useState, useEffect } from 'react';
import { useSavSubagentData } from '@/hooks/use-sav-subagent-data';

interface WorkingHoursConfigProps {
  onBack: () => void;
  subagentId?: string;
}

export const WorkingHoursConfig: React.FC<WorkingHoursConfigProps> = ({ onBack, subagentId = 'sav-general' }) => {
  // Récupération des données dynamiques selon le sous-agent
  const { workingHours } = useSavSubagentData(subagentId);
  
  const [outOfHoursMessage, setOutOfHoursMessage] = useState(workingHours.outOfHoursMessage);
  const [timezone, setTimezone] = useState(workingHours.timezone);
  const [startTime, setStartTime] = useState(workingHours.startTime);
  const [endTime, setEndTime] = useState(workingHours.endTime);
  const [workingDays, setWorkingDays] = useState(workingHours.workingDays);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Mettre à jour les états quand les données changent
  useEffect(() => {
    setOutOfHoursMessage(workingHours.outOfHoursMessage);
    setTimezone(workingHours.timezone);
    setStartTime(workingHours.startTime);
    setEndTime(workingHours.endTime);
    setWorkingDays(workingHours.workingDays);
  }, [workingHours]);

  const timezones = [
    { value: 'UTC+1', label: 'UTC+1 (Europe/Paris)' },
    { value: 'UTC+0', label: 'UTC+0 (Europe/London)' },
    { value: 'UTC-5', label: 'UTC-5 (America/New_York)' },
    { value: 'UTC+8', label: 'UTC+8 (Asia/Shanghai)' },
    { value: 'UTC+9', label: 'UTC+9 (Asia/Tokyo)' },
  ];

  const daysOfWeek = [
    { key: 'monday', label: 'Lundi' },
    { key: 'tuesday', label: 'Mardi' },
    { key: 'wednesday', label: 'Mercredi' },
    { key: 'thursday', label: 'Jeudi' },
    { key: 'friday', label: 'Vendredi' },
    { key: 'saturday', label: 'Samedi' },
    { key: 'sunday', label: 'Dimanche' },
  ];

  const handleDayToggle = (day: string) => {
    setWorkingDays(prev => ({
      ...prev,
      [day]: !prev[day as keyof typeof prev]
    }));
  };

  const handleSave = () => {
    // TODO: Implémenter la logique de sauvegarde
    console.log('Sauvegarde des heures de travail:', {
      outOfHoursMessage,
      timezone,
      startTime,
      endTime,
      workingDays
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: '#3C1C69',
        borderRadius: '8px',
        border: 'none',
        p: 3,
        mt: 0,
      }}
    >
      {/* Header avec bouton retour */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton
          onClick={onBack}
          sx={{
            color: '#BE30FF',
            mr: 2,
            width: '40px',
            height: '40px',
            '&:hover': {
              backgroundColor: 'rgba(190, 48, 255, 0.1)',
            },
          }}
        >
          <ArrowBack sx={{ fontSize: '24px', color: '#BE30FF' }} />
        </IconButton>
        <Typography
          sx={{
            color: '#EDEDED',
            fontFamily: theme.typography.fontTertiaryFamily,
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '121.331%',
            fontStyle: 'normal',
          }}
        >
          Configuration des heures de travail
        </Typography>
      </Box>

      {/* Message en dehors des heures d'ouverture */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            color: '#EDEDED',
            fontFamily: theme.typography.fontTertiaryFamily,
            fontSize: '20px',
            fontWeight: 500,
            lineHeight: '121.331%',
            mb: 2,
          }}
        >
          Message en dehors des heures d&apos;ouverture
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={outOfHoursMessage}
          onChange={(e) => setOutOfHoursMessage(e.target.value)}
          placeholder="Entrez le message à afficher en dehors des heures d'ouverture..."
          InputProps={{
            startAdornment: (
              <Tooltip title="Améliorer le message" arrow>
                <IconButton
                  onClick={() => {
                    // Améliorer le message en corrigeant les erreurs et en optimisant le texte
                    const improvedMessage = outOfHoursMessage
                      .replace(/\s+/g, ' ') // Supprimer les espaces multiples
                      .replace(/\s*([,.!?;:])\s*/g, '$1 ') // Espacer correctement la ponctuation
                      .replace(/\s*([.!?])\s*([A-Z])/g, '$1 $2') // Espacer après les phrases
                      .trim(); // Supprimer les espaces en début/fin
                    setOutOfHoursMessage(improvedMessage);
                  }}
                  sx={{
                    color: '#BE30FF',
                    padding: '4px',
                    marginRight: '4px',
                    alignSelf: 'flex-start',
                    marginTop: '8px',
                    '&:hover': {
                      color: '#8D31FB',
                      backgroundColor: 'rgba(190, 48, 255, 0.1)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/icons/magic.svg"
                    alt="Baguette magique"
                    sx={{
                      width: '20px',
                      height: '20px',
                    }}
                  />
                </IconButton>
              </Tooltip>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#FFF',
              fontFamily: theme.typography.fontFamily,
              fontSize: '22px',
              background: '#1A1D25',
              borderRadius: '24px',
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(#1A1D25, #1A1D25), linear-gradient(180deg, #BE30FF 0.66%, #5D31F8 51.44%, #00A3FF 100%)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.28), 0 16px 64px 0 rgba(0, 0, 0, 0.16)',
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255, 255, 255, 0.5)',
              opacity: 1,
            },
          }}
        />
      </Box>

      {/* Fuseau horaire */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            color: '#EDEDED',
            fontFamily: theme.typography.fontTertiaryFamily,
            fontSize: '20px',
            fontWeight: 500,
            lineHeight: '121.331%',
            mb: 2,
          }}
        >
          Fuseau horaire
        </Typography>
        <FormControl fullWidth>
          <Select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            displayEmpty
            MenuProps={{
              PaperProps: {
                sx: {
                  background: '#1A1D25',
                  borderRadius: '12px',
                  border: '1px solid rgba(141, 49, 251, 0.3)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  '& .MuiMenuItem-root': {
                    color: '#FFF',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '14px',
                    '&:hover': {
                      background: 'rgba(141, 49, 251, 0.1)',
                    },
                    '&.Mui-selected': {
                      background: 'rgba(141, 49, 251, 0.2)',
                      '&:hover': {
                        background: 'rgba(141, 49, 251, 0.3)',
                      },
                    },
                  },
                },
              },
            }}
            sx={{
              background: '#4C2086',
              borderRadius: '12px',
              color: '#FFF',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(141, 49, 251, 0.3)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(141, 49, 251, 0.5)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#8D31FB',
              },
              '& .MuiSelect-icon': {
                color: '#FFF',
              },
            }}
          >
            <MenuItem value="" disabled>
              <em>Sélectionnez un fuseau horaire</em></MenuItem>
            {timezones.map((tz) => (
              <MenuItem key={tz.value} value={tz.value}>
                {tz.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Heures d'ouverture */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            color: '#EDEDED',
            fontFamily: theme.typography.fontTertiaryFamily,
            fontSize: '20px',
            fontWeight: 500,
            lineHeight: '121.331%',
            mb: 2,
          }}
        >
          Heures d&apos;ouverture
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              sx={{
                color: '#9CA3AF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                fontWeight: 500,
                mb: 1,
              }}
            >
              Heure de début
            </Typography>
            <TextField
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: '#4C2086',
                  borderRadius: '12px',
                  color: '#FFF',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(141, 49, 251, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(141, 49, 251, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8D31FB',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                },
                '& input[type="time"]::-webkit-calendar-picker-indicator': {
                  width: '24.219px',
                  height: '24.219px',
                  flexShrink: 0,
                  fill: '#FFF',
                  filter: 'invert(1)',
                  cursor: 'pointer',
                },
                '& input[type="time"]::-webkit-datetime-edit-text': {
                  color: '#FFF',
                },
                '& input[type="time"]::-webkit-datetime-edit-hour-field': {
                  color: '#FFF',
                },
                '& input[type="time"]::-webkit-datetime-edit-minute-field': {
                  color: '#FFF',
                },
                '& input[type="time"]::-webkit-datetime-edit-ampm-field': {
                  color: '#FFF',
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{
                color: '#9CA3AF',
                fontFamily: theme.typography.fontFamily,
                fontSize: '14px',
                fontWeight: 500,
                mb: 1,
              }}
            >
              Heure de fin
            </Typography>
            <TextField
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: '#4C2086',
                  borderRadius: '12px',
                  color: '#FFF',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(141, 49, 251, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(141, 49, 251, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8D31FB',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                },
                '& input[type="time"]::-webkit-calendar-picker-indicator': {
                  width: '24.219px',
                  height: '24.219px',
                  flexShrink: 0,
                  fill: '#FFF',
                  filter: 'invert(1)',
                  cursor: 'pointer',
                },
                '& input[type="time"]::-webkit-datetime-edit-text': {
                  color: '#FFF',
                },
                '& input[type="time"]::-webkit-datetime-edit-hour-field': {
                  color: '#FFF',
                },
                '& input[type="time"]::-webkit-datetime-edit-minute-field': {
                  color: '#FFF',
                },
                '& input[type="time"]::-webkit-datetime-edit-ampm-field': {
                  color: '#FFF',
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Jours de la semaine */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            color: '#EDEDED',
            fontFamily: theme.typography.fontTertiaryFamily,
            fontSize: '20px',
            fontWeight: 500,
            lineHeight: '121.331%',
            mb: 2,
          }}
        >
          Jours de travail
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {daysOfWeek.map((day) => (
            <FormControlLabel
              key={day.key}
              control={
                <Switch
                  checked={workingDays[day.key as keyof typeof workingDays]}
                  onChange={() => handleDayToggle(day.key)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#8D31FB',
                      '& + .MuiSwitch-track': {
                        backgroundColor: '#8D31FB',
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#8D31FB',
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    color: '#EDEDED',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  {day.label}
                </Typography>
              }
              sx={{ ml: 0, minWidth: '120px' }}
            />
          ))}
        </Box>
      </Box>

      {/* Bouton Enregistrer */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: { xs: 'center', sm: 'flex-end' }, 
        alignItems: 'flex-end', 
        width: '100%' 
      }}>
        <Button
          onClick={handleSave}
          sx={{
            display: 'flex',
            width: { xs: '100%', sm: '345px' },
            height: { xs: '44px', sm: '48px' },
            padding: { xs: '12px 16px', sm: '14px 20px' },
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
            borderRadius: '26px',
            backgroundColor: '#8D31FB',
            color: '#FFFFFF',
            fontFamily: theme.typography.fontFamily,
            fontSize: { xs: '14px', sm: '16px' },
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#7B2AE8',
            },
          }}
        >
          {isMobile ? 'Enregistrer' : 'Enregistrer les heures de travail'}
        </Button>
      </Box>
    </Box>
  );
};
