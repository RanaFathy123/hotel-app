/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, Button, Popover, TextField } from "@mui/material";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { CalendarMonth } from "@mui/icons-material";

// interface
interface IProps {
  selectedDateRange?: DateRange;
  setSelectedDateRange?: (range: DateRange) => void;
  theme?: any;
}

type DateRange = [Dayjs, Dayjs];

const Calendar = ({
  selectedDateRange,
  setSelectedDateRange,
  theme,
}: IProps) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  if (!selectedDateRange) {
    return null;
  }

  const handleCalendarChange = (newDateRange: DateRange) => {
    setSelectedDateRange && setSelectedDateRange(newDateRange);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box sx={{ display: "flex", marginTop: "1rem", width: "95%" }}>
        {/* Button Month */}
        <Button
          sx={{
            fontSize: { xs: "1px", sm: "1px", md: "1px" },
            borderRadius: "5px",
            ml: "5px",
            my: { sm: 0 },
            color: "white",
            bgcolor: "rgba(21, 44, 91, 1)",
          }}
          onClick={handleButtonClick}
          variant="contained"
        >
          <CalendarMonth />
        </Button>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DateRangeCalendar"]}
              sx={{ color: " rgba(50, 82, 223, 1)" }}
            >
              <DateRangeCalendar
                value={selectedDateRange}
                onChange={handleCalendarChange}
                sx={{ color: " rgba(50, 82, 223, 1)" }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Popover>

        <TextField
          sx={{
            width: {
              xs: "100%",
              sm: "87.5%",
              md: "100%",
              lg: "80%",
              xl: "90%",
            },
            backgroundColor: theme?.palette.grey[100],
            border: "none !important",
            display: "flex",
            color: " rgba(21, 44, 91, 1)",
            justifyContent: "center",
            alignItems: "center",
            "& .MuiInputBase-input": {
              textAlign: "center", // Center align the text value
            },
          }}
          value={`${dayjs(selectedDateRange[0])?.format("DD-MM-YYYY")}- ${dayjs(
            selectedDateRange[1]
          )?.format("DD-MM-YYYY")}`}
        />
      </Box>
    </>
  );
};

export default Calendar;
