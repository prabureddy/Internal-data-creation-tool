import { useState, useRef, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Flex from "./component/Flex";
import TextField from "@mui/material/TextField";
import {
  GENERATE_RANDOM_ARRAY,
  GENERATE_RANDOM_DATE,
  GENERATE_RANDOM_DECIMAL,
  GENERATE_RANDOM_INTEGER,
  GENERATE_RANDOM_STRING,
} from "./helpers/index";
import { IconButton, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { CSVLink } from "react-csv";

const createData = (headerName, dataType, options = {}) => {
  return {
    id: GENERATE_RANDOM_INTEGER(1000, 9999),
    headerName,
    dataType,
    options,
  };
};

const setNestedObject = (obj, path, val) => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const lastObj = keys.reduce((obj, key) => (obj[key] = obj[key] || {}), obj);
  lastObj[lastKey] = val;
  return obj;
};

const initialRows = [createData("Full Name", "STRING")];

export default function BasicTable() {
  const [rows, setRows] = useState(initialRows);
  const [noOfRows, setNoOfRows] = useState(0);
  const csvInstance = useRef();

  const addNewRow = () => {
    const newRow = createData("", "STRING");
    setRows((rows) => [...rows, ...[newRow]]);
  };

  const copyRow = (rowId) => {
    const existingRow = rows.find((row) => row.id === rowId);
    const newData = createData(
      existingRow.headerName,
      existingRow.dataType,
      existingRow.options
    );
    setRows((rows) => [...rows, ...[newData]]);
  };

  const deleteRow = (rowId) => {
    setRows((rows) => rows.filter((row) => row.id !== rowId));
  };

  const handleChangeField = (rowId, field, value) => {
    const rowIndex = rows.findIndex((row) => row.id === rowId);
    const duplicateRows = [...rows];
    duplicateRows[rowIndex] = setNestedObject(
      duplicateRows[rowIndex],
      field,
      value
    );
    setRows(duplicateRows);
  };

  const generateCSV = () => {
    if (noOfRows === 0) {
      alert("No of rows is Zero :)");
      return;
    }
    csvInstance.current.link.click();
  };

  const csvHeaders = [
    ...rows.map((row) => ({
      label: row.headerName,
      key: row.headerName,
    })),
  ];

  const csvData = useMemo(() => {
    if (noOfRows === 0) return [];
    const generatedArray = Array(noOfRows)
      .fill(null)
      ?.map(() => {
        const myObject = {};
        rows.forEach((e) => {
          myObject[e.headerName] =
            e.dataType === "STRING"
              ? GENERATE_RANDOM_STRING()
              : e.dataType === "INTEGER"
              ? GENERATE_RANDOM_INTEGER(
                  e.options?.minLength,
                  e.options?.maxLength
                )
              : e.dataType === "DECIMAL"
              ? GENERATE_RANDOM_DECIMAL(
                  e.options?.minLength,
                  e.options?.maxLength,
                  e.options?.decimalPlaces
                )
              : e.dataType === "DATE"
              ? GENERATE_RANDOM_DATE(e.options?.minDate, e.options?.maxDate)
              : e.dataType === "ARRAY"
              ? GENERATE_RANDOM_ARRAY(e.options?.arrayLength)
              : e.dataType === "CUSTOM"
              ? e.options?.customValue
              : "";
        });
        return myObject;
      });
    return generatedArray;
  }, [noOfRows, rows]);

  const handleCopyJSON = () => {
    const input = document.createElement("input");
    input.setAttribute("value", JSON.stringify(csvData));
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  };

  return (
    <Flex sx={{ flexDirection: "column", gap: "60px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Header Name</TableCell>
              <TableCell>Data Type</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell>
                <IconButton color="primary" onClick={addNewRow}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <TextField
                    label="Enter Header Name"
                    variant="standard"
                    defaultValue={row.headerName}
                    onChange={(e) => {
                      handleChangeField(row.id, "headerName", e.target.value);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={row.dataType}
                    onChange={(e) =>
                      handleChangeField(row.id, "dataType", e.target.value)
                    }
                  >
                    <MenuItem value={"STRING"}>String</MenuItem>
                    <MenuItem value={"INTEGER"}>Integer</MenuItem>
                    <MenuItem value={"DECIMAL"}>Decimal</MenuItem>
                    <MenuItem value={"DATE"}>Date</MenuItem>
                    <MenuItem value={"ARRAY"}>Array</MenuItem>
                    <MenuItem value={"CUSTOM"}>Custom</MenuItem>
                  </Select>
                </TableCell>
                {row?.dataType === "ARRAY" && (
                  <TableCell>
                    <TextField
                      label="No of items in array"
                      variant="standard"
                      defaultValue={row.options?.arrayLength}
                      type="number"
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      onChange={(e) => {
                        handleChangeField(
                          row.id,
                          "options.arrayLength",
                          e.target.value ? parseInt(e.target.value) : 0
                        );
                      }}
                    />
                  </TableCell>
                )}
                {row?.dataType === "CUSTOM" && (
                  <TableCell>
                    <TextField
                      label="Enter Custom Value"
                      variant="standard"
                      defaultValue={row.options?.customValue}
                      onChange={(e) => {
                        handleChangeField(
                          row.id,
                          "options.customValue",
                          e.target.value
                        );
                      }}
                    />
                  </TableCell>
                )}
                {(row?.dataType === "INTEGER" ||
                  row?.dataType === "DECIMAL") && (
                  <>
                    <TableCell>
                      <TextField
                        label="Integer From (Min)"
                        variant="standard"
                        defaultValue={row.options?.minLength}
                        type="number"
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                        onChange={(e) => {
                          handleChangeField(
                            row.id,
                            "options.minLength",
                            e.target.value ? parseInt(e.target.value) : 0
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Integer To (Max)"
                        variant="standard"
                        defaultValue={row.options?.maxLength}
                        type="number"
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                        onChange={(e) => {
                          handleChangeField(
                            row.id,
                            "options.maxLength",
                            e.target.value ? parseInt(e.target.value) : 0
                          );
                        }}
                      />
                    </TableCell>
                    {row?.dataType === "DECIMAL" && (
                      <TableCell>
                        <TextField
                          label="No of Decimal Places (.00)"
                          variant="standard"
                          defaultValue={row.options?.decimalPlaces}
                          inputProps={{
                            inputMode: "decimal",
                            pattern: "[0-9]*",
                          }}
                          onChange={(e) => {
                            handleChangeField(
                              row.id,
                              "options.decimalPlaces",
                              e.target.value ? parseInt(e.target.value) : 0
                            );
                          }}
                        />
                      </TableCell>
                    )}
                  </>
                )}
                {row?.dataType === "DATE" && (
                  <>
                    <TableCell>
                      <TextField
                        label="Date From (MM/DD/YYYY)"
                        variant="standard"
                        defaultValue={row.options?.minDate}
                        onChange={(e) => {
                          handleChangeField(
                            row.id,
                            "options.minDate",
                            e.target.value ? new Date(e.target.value) : 0
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Date To (MM/DD/YYYY)"
                        variant="standard"
                        defaultValue={row.options?.maxDate}
                        onChange={(e) => {
                          handleChangeField(
                            row.id,
                            "options.maxDate",
                            e.target.value ? new Date(e.target.value) : 0
                          );
                        }}
                      />
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <IconButton color="primary" onClick={() => copyRow(row.id)}>
                    <ContentCopyIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => deleteRow(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Flex sx={{ justifyContent: "space-evenly" }}>
        <TextField
          label="No. of rows to generate"
          variant="standard"
          defaultValue={noOfRows}
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(e) =>
            setNoOfRows(e.target.value ? parseInt(e.target.value) : 0)
          }
        />
        <CSVLink
          headers={csvHeaders}
          data={csvData}
          ref={csvInstance}
          onClick={generateCSV}
          filename={`Generated-CSV-${new Date().toISOString()}.csv`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" component="label">
            Generate CSV
          </Button>
        </CSVLink>
        <Button
          endIcon={<ContentCopyIcon />}
          variant="contained"
          size="small"
          component="label"
          onClick={handleCopyJSON}
        >
          Copy JSON
        </Button>
      </Flex>
    </Flex>
  );
}
