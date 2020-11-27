/* eslint-disable react/jsx-indent */
import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
    List, ListItem, ListItemText,
} from '@material-ui/core';
import GroupDelete from './GroupDelete';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function GroupView(props) {
    const {
        groups, deleteGroup
    } = props;
    const classes = useStyles();
    const history = useHistory();

    return (
        <List component="nav" aria-label="main mailbox folders">
            {Object.keys(groups).map(key => {
                const group = groups[key];
                return (
                    <ListItem className={classes.title}>
                        <ListItemText component="a" onClick={() => history.push(`group/detail/${group.id}`)} primary={group.name} />
                        <GroupDelete groupId={group.id} deleteGroup={deleteGroup} />
                    </ListItem>
                );
            })}
        </List>
    );
}

GroupView.propTypes = {
    groups: PropTypes.object.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    deleteMember: PropTypes.func.isRequired,
    createInvitation: PropTypes.func.isRequired
};
