// React + Redux + Functionality
import React from 'react';

// Utilities
import { getEOCInfo, developmentLevelToString } from 'utils/eocs';
import { getDetailsOfReviewEOC, getRangeOfDevelopmentLevel, getAverageOfDevelopmentLevel } from 'utils/compileResult';

// Material Kit
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';

// Material UI
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Icons
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// Styles
import { makeStyles } from '@material-ui/core/styles';
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { eocGeneralAndSpecific, reviewsUserLinked } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const allEOCReviewDetailsPerReviewer = reviewsUserLinked.map(({review, reviewer})=>{
        const eocReviewOfCurrentReviewer = getDetailsOfReviewEOC(eocGeneralAndSpecific,review);
        return {
            reviewer,
            eocReview: eocReviewOfCurrentReviewer
        };
    });
    const developmentLevelList = allEOCReviewDetailsPerReviewer.map(({eocReview})=>eocReview?.rating);
    const rangeOfDevelopmentLevel = getRangeOfDevelopmentLevel(developmentLevelList);
    const averageOfDevelopmentLevel = getAverageOfDevelopmentLevel(developmentLevelList);
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                
                <TableCell component="th" scope="row">
                    EOC {eocGeneralAndSpecific}
                </TableCell>
                {allEOCReviewDetailsPerReviewer.map(
                    ({eocReview},index)=> <TableCell key={index} align="right">{eocReview.rating || '-'}</TableCell>
                )}
                <TableCell align="right">{rangeOfDevelopmentLevel}</TableCell>
                <TableCell align="right">{averageOfDevelopmentLevel}</TableCell>
                <TableCell align="right">
                
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, background:'#CDCDCD' }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                Reviewer Comments and Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Reviewer No</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Development Level</TableCell>
                                        <TableCell align="right">Reason</TableCell>
                                        <TableCell align="right">Idea for Improvements</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allEOCReviewDetailsPerReviewer.map( ({reviewer,eocReview},index)=> 
                                        (<TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {index+1}
                                            </TableCell>
                                            <TableCell>{reviewer?.name || reviewer?.email}</TableCell>
                                            <TableCell>{developmentLevelToString ? developmentLevelToString[eocReview.rating] : '-'}</TableCell>
                                            <TableCell align="right">{eocReview.reason}</TableCell>
                                            <TableCell align="right">{eocReview.ideaForImprovement}</TableCell>
                                        </TableRow>))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable({reviewsUserLinked}) {

    const eocs  = getEOCInfo();
    return (
        <Card>
            <CardBody>
                <CardHeader color="success">Elements of Competencies Assessment</CardHeader>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Elements of Competencies</TableCell>
                                {reviewsUserLinked?.map((_,index)=>(
                                    <TableCell align="right" key={index}>R{index+1}</TableCell>
                                ))}
                                <TableCell align="right">Range</TableCell>
                                <TableCell align="right">Mean</TableCell>
                                <TableCell align="right"/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {eocs.map((eocSet) => {
                                return eocSet.EOCS.map((eoc) => {
                                    const eocGeneralAndSpecific = `${eocSet.setNum}.${eoc.EOCNum}`;
                                    return(<Row key={eocGeneralAndSpecific} eocGeneralAndSpecific={eocGeneralAndSpecific} reviewsUserLinked={reviewsUserLinked} />);
                                });
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardBody>
        </Card>
    );
}
