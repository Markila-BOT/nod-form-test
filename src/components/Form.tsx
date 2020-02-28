import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MuiPhoneNumber from 'material-ui-phone-number';
import ProgressBar from './ProgressBar';
import { CSVLink } from 'react-csv';

const gender = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
  { label: 'Other', value: 'other' }
];

const aor = [
  { label: 'Insurance', value: 'insurance' },
  { label: 'Superannuation', value: 'superannuation' },
  { label: 'Investments', value: 'investments' },
  { label: 'Cashflow', value: 'Cashflow' },
  { label: 'Pension', value: 'Pension' },
  { label: 'Estate Planning', value: 'estatePlanning' }
];

const validationSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  birthday: yup
    .date()
    .min(new Date('01-01-1905'))
    .max(new Date())
    .required('Required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Required'),
  address: yup.string().required('Required'),
  phoneNumber: yup.string().required('Required'),
  gender: yup.string().required('Required'),
  aor: yup.string().required('Required')
});

export default function Form() {
  const currentGoal = 8;
  const [progress, setProgress] = useState(0);
  const [csvData, setCsvData] = useState<any>([]);
  const handleProgress = (values, errors?) => {
    let curretProgress = 0;
    if (!!values.firstName && !errors.firstName) {
      curretProgress += 1;
    }
    if (!!values.lastName && !errors.lastName) {
      curretProgress += 1;
    }
    if (!!values.birthday && !errors.birthday) {
      curretProgress += 1;
    }
    if (!!values.email && !errors.email) {
      curretProgress += 1;
    }
    if (!!values.address && !errors.address) {
      curretProgress += 1;
    }
    if (!!values.phoneNumber && !errors.phoneNumber) {
      curretProgress += 1;
    }
    if (!!values.gender && !errors.gender) {
      curretProgress += 1;
    }
    if (!!values.aor && !errors.aor) {
      curretProgress += 1;
    }
    setProgress(curretProgress);
  };

  const clearProgress = () => {
    setProgress(0);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        birthday: '',
        email: '',
        address: '',
        phoneNumber: '',
        gender: '',
        aor: ''
      }}
      onSubmit={(values: any, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        let newArray = csvData;
        newArray.push(values);
        setTimeout(() => {
          setCsvData(newArray);
          resetForm();
          clearProgress();
          setSubmitting(false);
        }, 500);
      }}
      validationSchema={validationSchema}
    >
      {({
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
      }) => (
        <div className="container">
          <ProgressBar progress={progress} goal={currentGoal} />
          <form onSubmit={handleSubmit}>
            <Card className="card">
              <CardContent>
                <TextField
                  id="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={event => {
                    handleProgress(values, errors);
                    handleBlur(event);
                  }}
                  helperText={touched.firstName ? errors.firstName : ''}
                  error={touched.firstName && Boolean(errors.firstName)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={event => {
                    handleProgress(values, errors);
                    handleBlur(event);
                  }}
                  helperText={touched.lastName ? errors.lastName : ''}
                  error={touched.lastName && Boolean(errors.lastName)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  id="birthday"
                  label="Date of Birth"
                  type="date"
                  value={values.birthday}
                  onChange={handleChange}
                  onBlur={event => {
                    handleProgress(values, errors);
                    handleBlur(event);
                  }}
                  helperText={touched.birthday ? errors.birthday : ''}
                  error={touched.birthday && Boolean(errors.birthday)}
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                />
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={event => {
                    handleProgress(values, errors);
                    handleBlur(event);
                  }}
                  helperText={touched.email ? errors.email : ''}
                  error={touched.email && Boolean(errors.email)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  title="The customers primary contact email address"
                />
                <TextField
                  id="address"
                  label="Address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={event => {
                    handleProgress(values, errors);
                    handleBlur(event);
                  }}
                  helperText={touched.address ? errors.address : ''}
                  error={touched.address && Boolean(errors.address)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  multiline
                  title="The customers current residential address"
                />

                <MuiPhoneNumber
                  id="phoneNumber"
                  label="Phone Number"
                  value={values.phoneNumber}
                  helperText={touched.phoneNumber ? errors.phoneNumber : ''}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  onChange={handleChange('phoneNumber')}
                  onBlur={event => {
                    handleProgress(values, errors);
                    handleBlur(event);
                  }}
                  defaultCountry={'au'}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                />
                <TextField
                  select
                  id="gender"
                  label="Gender"
                  value={values.gender}
                  onChange={handleChange('gender')}
                  onBlur={event => {
                    handleProgress(values, errors);
                    handleBlur(event);
                  }}
                  helperText={touched.gender ? errors.gender : ''}
                  error={touched.gender && Boolean(errors.gender)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                >
                  {gender.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  id="aor"
                  label="Areas of Recommendation"
                  value={values.aor}
                  onChange={handleChange('aor')}
                  onBlur={event => {
                    handleProgress(values, errors);
                    handleBlur(event);
                  }}
                  helperText={touched.aor ? errors.aor : ''}
                  error={touched.aor && Boolean(errors.aor)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  title="Select all of the areas that you are providing a recommendation for"
                >
                  {aor.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </CardContent>
              <CardActions className="actions">
                <Button
                  type="submit"
                  color="primary"
                  disabled={progress !== currentGoal || isSubmitting}
                >
                  SUBMIT
                </Button>
                <Button
                  color="secondary"
                  onClick={event => {
                    clearProgress();
                    handleReset(event);
                  }}
                >
                  CLEAR
                </Button>
                {!!csvData && csvData.length > 0 ? (
                  <CSVLink filename={'submissions.csv'} data={csvData}>
                    Generate CSV
                  </CSVLink>
                ) : null}
              </CardActions>
            </Card>
          </form>
        </div>
      )}
    </Formik>
  );
}
