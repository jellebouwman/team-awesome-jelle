import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import './team-member-overview.scss';

import TeamMember from '../team-member/TeamMember';

class TeamMemberOverview extends React.Component {
  static propTypes = {
    teamMembers: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      currentEmployer: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      employeeNumber: PropTypes.string.isRequired,
      facebookHandle: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      jobTitle: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      startingDate: PropTypes.string.isRequired,
      twitterHandle: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired
    })).isRequired,
    onChangeSortingDirection: PropTypes.func.isRequired,
    onChangeSortByProperty: PropTypes.func.isRequired,
    onRequestTeamMembers: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired
  }


  componentDidMount() {
    this.props.onRequestTeamMembers();
  }

  render() {
    const {
      sortBy, sortDirection, teamMembers,
      onChangeSortByProperty, onChangeSortingDirection
    } = this.props;
    return (
      <div className="team-member-overview">
        <section className="team-member-overview__top-wrapper">
          <h1 className="team-member-overview__top-title">
            All Humanoids
          </h1>
          <Link href="/add-team-member">
            <button
              className="team-member-overview__add-button"
              type="button"
            >
              New Humanoid
            </button>
          </Link>

          <select
            className="team-member-overview__select"
            onChange={({ target: { value } }) => onChangeSortByProperty(value)}
            name="sortBy"
            value={sortBy}
          >
            <option
              value="firstName"
            >
              First Name
            </option>
            <option
              value="lastName"
            >
              Last Name
            </option>
          </select>
          <select
            className="team-member-overview__select"
            onChange={({ target: { value } }) => onChangeSortingDirection(value)}
            name="sortDirection"
            value={sortDirection}
          >
            <option
              value="ascending"
            >
              Ascending
            </option>
            <option
              value="descending"
            >
              Descending
            </option>
          </select>
        </section>
        <ul className="team-member-overview__content-wrapper">
          {teamMembers.map(teamMember => (
            <li key={teamMember.id}>
              <TeamMember
                avatar={teamMember.avatar}
                currentEmployer={teamMember.currentEmployer}
                employeeNumber={teamMember.employeeNumber}
                firstName={teamMember.firstName}
                jobTitle={teamMember.jobTitle}
                lastName={teamMember.lastName}
                startingDate={teamMember.startingDate}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TeamMemberOverview;
