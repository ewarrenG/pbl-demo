import React, { useState, useEffect } from 'react';

//material
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Icon from '@material-ui/core/Icon';
import FilterListIcon from '@material-ui/icons/FilterList';
import LinkIcon from '@material-ui/icons/Link';
import GavelIcon from '@material-ui/icons/Gavel';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import BuildIcon from '@material-ui/icons/Build';


import Tabs from '../Material/SimpleTabs'
import $ from 'jquery';

import UsecaseContent from '../../usecaseContent.json'; // still necessary to map over demo components
import '../Home.css'

const { validIdHelper } = require('../../tools');

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        minWidth: 275,
        minHeight: 720,
    },
    flexCentered: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridTitle: {
        marginBottom: 12,
    },
    body: {
        marginLeft: 12
    },
    pos: {
        marginBottom: 12,
    },
    divider: {
        marginTop: 24,
        marginBottom: 24
    },
    icon: {
        marginLeft: 12
    }
}));

export default function DashboardOverviewDetail(props) {
    // console.log('DashboardOverviewDetail')
    // console.log('props', props)

    const classes = useStyles();
    const { staticContent, staticContent: { lookerContent }, staticContent: { type }, activeTabValue, handleTabChange, lookerUser, sampleCode } = props;
    const sampleCodeTab = { type: 'sample code', label: 'Code', id: 'sampleCode', lookerUser, sampleCode }


    useEffect(() => {
        // console.log('useEffect');
    })

    return (

        <div className={classes.root}>

            <Grid container
                spacing={3}
                key={validIdHelper(type)} >
                <Tabs
                    tabContent={[...lookerContent, sampleCodeTab]}
                    activeTabValue={activeTabValue}
                    handleTabChange={handleTabChange}
                    demoComponentType={type || 'sample code'} />
            </Grid >

        </div>
    )
}