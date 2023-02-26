import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import ArchiveIcon from '@mui/icons-material/Archive';
import { actionCreators, GAEventsTracker } from '../../../Paths';
import moment from 'moment';
import Keyresult from './Keyresult';
import Addkeyresult from './AddKeyresult';
const Objective = ({ objectives, svg, userId }) => {
	const [ addkeyResult, setaddkeyResult ] = React.useState(false);
	const [ editObjective, setEditObjective ] = React.useState(false);
	const [ activeObj, setactiveObj ] = React.useState('');

	const loading = useSelector((state) => state.requests.loading);

	const UseGAEventsTracker = GAEventsTracker('Objectives');

	const [ objstate, setObjstate ] = React.useState({
		objective: ''
	});

	const dispatch = useDispatch();

	return (
		<div className="objective-bg">
			{objectives &&
				objectives.map((obj, index) => (
					<div className="objective" key={obj._id}>
						<div className="objective-header">
							<div className="objective-name-row">
								<h4>Objective {index >= 0 ? index + 1 : null}</h4>
								<p>{moment(obj.updatedAt).fromNow()}</p>
							</div>
							{/* {obj.quarter === 4 ? null : (
								<h5 onClick={() => dispatch(actionCreators.updateQuarter(obj._id))}>
									Push to next Quarter{' '}
								</h5>
							)} */}
							{loading && obj._id === activeObj ? (
								<img src={svg} style={{ width: '30px', height: '30px' }} />
							) : (
								<ArchiveIcon
									className="edit-stmt-icon"
									style={{ fontSize: '20px', color: '#dfa126' }}
									onClick={() => {
										setactiveObj(obj._id);
										dispatch(actionCreators.archiveObjective(obj._id));
									}}
								/>
							)}
						</div>
						<div className="objective-description">
							<div className="objective-description-row">
								{editObjective && obj._id === activeObj ? (
									<input
										type="text"
										placeholder="Enter new Objective"
										value={objstate.objective}
										onFocus={() => setObjstate({ objective: obj.description })}
										onChange={(e) => setObjstate({ ...objstate, objective: e.target.value })}
										onKeyUp={(e) => {
											if (e.key === 'Enter' && objstate.objective) {
												dispatch(
													actionCreators.editObjective(obj._id, objstate.objective, (res) => {
														UseGAEventsTracker('edit objective', objstate.objective);
														if (res.success) {
															setEditObjective(false);
															setObjstate({
																objective: ''
															});
														}
													})
												);
											}
										}}
									/>
								) : null}
								{editObjective && obj._id === activeObj ? null : <h2>{obj.description}</h2>}
								{/* {editObjective ? null : (
									<EditIcon
										className="edit-stmt-icon"
										style={{ fontSize: '20px' }}
										onClick={() => {
											setactiveObj(obj._id);
											setEditObjective(true);
										}}
									/>
								)} */}
								{editObjective && obj._id === activeObj ? (
									<p
										style={{ marginRight: '5px' }}
										onClick={() => {
											if (objstate.objective) {
												dispatch(
													actionCreators.editObjective(obj._id, objstate.objective, (res) => {
														UseGAEventsTracker('edit objective', objstate.objective);
														if (res.success) {
															setEditObjective(false);
															setObjstate({
																objective: ''
															});
														}
													})
												);
											}
										}}
									>
										save
									</p>
								) : null}
								{editObjective && obj._id === activeObj ? (
									<CancelIcon
										onClick={() => setEditObjective(false)}
										className="edit-stmt-icon"
										style={{ fontSize: '20px' }}
									/>
								) : null}
								{loading && obj._id === activeObj ? (
									<p style={{ color: '#dfa126' }}>updating...</p>
								) : null}
							</div>
							<div className="objective-description-row">
								<h4>{!obj.objPercentage ? 0 : Math.round(obj.objPercentage)}%</h4>
								<h5>covered</h5>
							</div>
						</div>
						{obj &&
							obj.keyresults.map((k) => (
								<Keyresult
									k={k}
									svg={svg}
									loading={loading}
									dispatch={dispatch}
									actionCreators={actionCreators}
								/>
							))}
						{addkeyResult && obj._id === activeObj ? (
							<Addkeyresult
								obj={obj}
								dispatch={dispatch}
								actionCreators={actionCreators}
								setaddkeyResult={setaddkeyResult}
								userId={userId}
							/>
						) : null}
						{addkeyResult ? null : (
							<button
								onClick={() => {
									setactiveObj(obj._id);
									setaddkeyResult(true);
								}}
							>
								Add keyresult
							</button>
						)}
						{addkeyResult && obj._id === activeObj ? (
							<button onClick={() => setaddkeyResult(false)}>Cancel</button>
						) : null}
					</div>
				))}
		</div>
	);
};

export default Objective;
