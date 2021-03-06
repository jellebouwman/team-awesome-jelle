import React from 'react';

import SelectBox from '../../shared/components/select-box/SelectBox';
import { convertDateToIso, convertTimeToIso } from '../../services/convert-time/convert-time';

import { ClientOptionModel } from '../../ducks/clients';

import './add-timesheet.scss';

interface AddTimesheetProps {
  clientOptions: ClientOptionModel[];
  isFormSaving: boolean;
  onSave;
}

interface TimesheetFormValidity {
  clientId: boolean;
  activity: boolean;
  date: boolean;
  startTime: boolean;
  endTime: boolean;
}

interface TimesheetFormValues {
  clientId: string;
  activity: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface AddTimesheetState {
  validity: TimesheetFormValidity;
  timeEntry: TimesheetFormValues;
  isFormVisible: boolean;
}

class AddTimesheet extends React.Component<AddTimesheetProps, AddTimesheetState> {
  inputForm: React.RefObject<HTMLFormElement>;

  static defaultState = {
    defaultFormValues: {
      clientId: '',
      activity: 'Design',
      date: '',
      startTime: '',
      endTime: ''
    },
    defaultValidity: {
      clientId: true,
      activity: true,
      date: true,
      startTime: true,
      endTime: true
    },
    isFormVisible: false
  }

  constructor(props) {
    super(props);
    this.inputForm = React.createRef();
  }

  state = {
    timeEntry: AddTimesheet.defaultState.defaultFormValues,
    validity: AddTimesheet.defaultState.defaultValidity,
    isFormVisible: false
  }

  toggleForm = () => {
    this.setState(({ isFormVisible }) => ({ isFormVisible: !isFormVisible }));
  }

  handleChange = ({ target }) => {
    this.setState(prevState => ({
      timeEntry: {
        ...prevState.timeEntry,
        [target.name]: target.value
      }
    }));
  };

  handleSubmit = (event) => {
    const { onSave } = this.props;
    const { timeEntry } = this.state;
    event.preventDefault();

    const newEntry = {
      ...timeEntry,
      date: convertDateToIso(timeEntry.date),
      startTime: convertTimeToIso(timeEntry.startTime, timeEntry.date),
      endTime: convertTimeToIso(timeEntry.endTime, timeEntry.date)
    };
    onSave(newEntry);
    this.setState({ timeEntry: AddTimesheet.defaultState.defaultFormValues });
    this.toggleForm();
  }

  handleBlur = ({ target }) => {
    this.setState(prevState => ({
      validity: {
        ...prevState.validity,
        [target.name]: target.validity.valid
      }
    }));
  }

  validateForm = () => this.inputForm.current && Array
    .from(this.inputForm.current.elements)
    .every((formItem: HTMLInputElement) => formItem.validity.valid)

  static getDerivedStateFromProps(nextProps, prevState) {
      return (nextProps.clientOptions.length && !prevState.timeEntry.clientId.length)
        ? {
          timeEntry: {
            ...prevState.timeEntry,
            clientId: nextProps.clientOptions[0].value
          }
        } : {};
    }

  render() {
    const { clientOptions, isFormSaving } = this.props;
    const {
      isFormVisible, timeEntry, validity
    } = this.state;
    const {
      clientId, activity, date, startTime, endTime
    } = timeEntry;

    return (
      <section className="add-timesheet">
        <button
          className={`
            add-timesheet__new-button
            add-timesheet__new-button${isFormVisible ? '--invisible' : '--visible'}
          `}
          onClick={this.toggleForm}
          type="button"
        >
          New time entry
        </button>
        <button
          className={`
            add-timesheet__close-button
            add-timesheet__close-button${isFormVisible ? '--visible' : '--invisible'}
          `}
          onClick={this.toggleForm}
          type="button"
        />
        <form
          ref={this.inputForm}
          onSubmit={this.handleSubmit}
          className={`
            add-timesheet__form
            add-timesheet__form${isFormVisible ? '--open' : '--closed'}
            `}
        >
          <div className="add-timesheet__employer">
            <label
              className="add-timesheet__label"
              id="clientId"
              htmlFor="clientId"
            >
              client
            </label>
            <SelectBox
              activeValue={clientId}
              name="clientId"
              onChange={this.handleChange}
              options={clientOptions}
              type="form"
            />
          </div>
          <div className="add-timesheet__activity">
            <label
              className="add-timesheet__label"
              htmlFor="activity"
            >
              activity
            </label>
            <SelectBox
              activeValue={activity}
              name="activity"
              onChange={this.handleChange}
              options={[{ label: 'Design', value: 'Design' },
                { label: 'Meeting', value: 'Meeting' }
              ]}
              type="form"
            />
          </div>
          <div className="add-timesheet__date">
            <label
              className="add-timesheet__label"
              htmlFor="date"
            >
              date
              <input
                className={`
                  add-timesheet__select
                  add-timesheet__select${validity.date ? '--valid' : '--invalid'}
                `}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                name="date"
                pattern="(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-]\d{4}"
                required
                type="text"
                value={date}
              />
            </label>
          </div>
          <div className="add-timesheet__time">
            <div className="add-timesheet__start-time">
              <label
                className="add-timesheet__label"
                htmlFor="from"
              >
              from
                <input
                  className={`
                    add-timesheet__select
                    add-timesheet__select${validity.startTime ? '--valid' : '--invalid'}
                  `}
                  id="from"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  name="startTime"
                  pattern="([01]?[0-9]|2[0-3]).[0-5][0-9]"
                  required
                  type="text"
                  value={startTime}
                />
              </label>
            </div>
            <div className="add-timesheet__end-time">
              <label
                className="add-timesheet__label"
                htmlFor="to"
              >
                to
                <input
                  className={`
                    add-timesheet__select
                    add-timesheet__select${validity.endTime ? '--valid' : '--invalid'}
                  `}
                  id="to"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  name="endTime"
                  pattern="([01]?[0-9]|2[0-3]).[0-5][0-9]"
                  required
                  type="text"
                  value={endTime}
                />
              </label>
            </div>
          </div>
          <div className="add-timesheet__add-button-wrapper">
            <button
              className={`
                add-timesheet__add-button
                add-timesheet__add-button${isFormSaving ? '--saving' : ''}
              `}
              type="submit"
              disabled={isFormSaving || !this.validateForm()}
            >
              {isFormSaving ? 'Saving' : 'Add'}
            </button>
          </div>
        </form>
      </section>
    );
  }
}
export default AddTimesheet;
