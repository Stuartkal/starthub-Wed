import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, message, Tabs, Modal } from "antd";
import { actionCreators, svg } from "../../Paths";
import { Helmet } from "react-helmet";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { getCurrentQuarter } from "../../utilities/helpers";

import Quarter from "../../Admin/OkrOverview/Quarter";
import Tasks from "../../Admin/OkrOverview/Tasks";
import MenuBar from "../../Admin/OkrOverview/MenuBar";
import AddObjectiveDialogue from "../../Admin/OkrOverview/AddObjectiveDialogue";
import "../../Admin/OkrOverview/OKROverviewStyles.css";
import moment from "moment";
const OKROverview = () => {
  const { TabPane } = Tabs;
  const { users } = useSelector((state) => state.admin);
  const { objectives, loading } = useSelector((state) => state.requests);
  const [tasks, setTasks] = React.useState({
    members: [],
    task: "",
  });
  const [open, setOpen] = React.useState(false);
  const [openDialogue, setOpenDialogue] = React.useState(false);
  const [objective, setAddObjective] = React.useState(false);
  const [editObjective, setEditObjective] = React.useState(false);
  const [keyResult, setAddKeyresult] = React.useState(false);
  const [editkeyResult, setEditKeyresult] = React.useState(false);
  const [progressBtn, setProgressBtn] = React.useState(false);
  const [activeCardId, setActiveCardId] = React.useState("");
  const [payload, setPayload] = React.useState([]);
  const [selectedKeyresult, setSelectedKeyresult] = React.useState({
    tasks: [],
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    getObjectives();
    updateObjectives();
  }, []);

  const updateObjectives = () => {
    const newPayload = [
      ...objectives?.map((d) => {
        const { objPercentage, keyresults, ...rest } = d;
        return {
          ...rest,
          objPercentage: objPercentage,
          keyresults: [
            ...keyresults?.map((s) => {
              const { checked, ...keyresult } = s;
              return {
                ...keyresult,
                checked: checked ? checked : false,
              };
            }),
          ],
        };
      }),
    ];
    return setPayload(newPayload);
  };

  const getObjectives = () => {
    dispatch(
      actionCreators.getItem(`catalyzer/objectives`, (res) => {
        const { success, data, error } = res;
        if (success) {
          setPayload(data.objs);
          dispatch(actionCreators.setObjectives(data.objs));
        }
        if (!success) console.log(error);
      })
    );
  };

  const openModal = React.useCallback(
    (objId, krId) => {
      let paylod = [...payload];
      let indexNumber = -1;
      paylod.forEach((r, index) => {
        if (r._id === objId) indexNumber = index;
      });
      let optionPaylod = [...paylod[indexNumber].keyresults];
      let optionIndex = -1;
      optionPaylod.forEach((r, index) => {
        if (r._id === krId) optionIndex = index;
      });
      setSelectedKeyresult(optionPaylod[optionIndex]);
      setOpen(true);
    },
    [setOpen, setSelectedKeyresult, payload]
  );

  const closeModal = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const showAddObjective = () => setAddObjective(true);
  const hideAddObjective = () => setAddObjective(false);

  const showEditObjective = (id) => {
    setActiveCardId(id);
    setEditObjective(true);
  };
  const hideEditObjective = () => setEditObjective(false);

  const showEditKeyresult = (id) => {
    setActiveCardId(id);
    setEditKeyresult(true);
  };
  const hideEditKeyresult = () => setEditKeyresult(false);

  const showAddKeyresult = (id) => {
    setActiveCardId(id);
    setAddKeyresult(true);
  };
  const hideAddKeyresult = () => setAddKeyresult(false);

  const showProgressBtn = (id) => {
    setActiveCardId(id);
    setProgressBtn(true);
  };
  const hideProgressBtn = () => setProgressBtn(false);

  const deleteObjective = (id) => {
    dispatch(
      actionCreators.deleteObjective(id, (res) => {
        const { success, data } = res;
        if (success) {
          setPayload(data);
        }
      })
    );
  };

  const deleteKeyresult = (objId, krId) => {
    let paylod = [...payload];
    let objIndex = -1;

    paylod.forEach((r, index) => {
      if (r._id === objId) return (objIndex = index);
    });

    const keyresults = paylod[objIndex].keyresults;

    const removeKeyresult = keyresults.filter((kr) => kr._id !== krId);
    paylod[objIndex] = {
      ...paylod[objIndex],
      keyresults: removeKeyresult,
    };

    paylod[objIndex].objPercentage =
      (paylod[objIndex].keyresults.filter((kr) => kr.checked).length /
        paylod[objIndex].keyresults.length) *
      100;

    setPayload(paylod);
    showProgressBtn(objId);
  };

  const handleOpenDialogue = () => {
    setOpenDialogue(true);
  };

  const handleCloseDialogue = () => {
    setOpenDialogue(false);
  };

  return (
    <div className="okroverview-container">
      <Helmet>
        <title>OKRs</title>
      </Helmet>
      <AddObjectiveDialogue
        open={openDialogue}
        setPayload={setPayload}
        handleClose={handleCloseDialogue}
      />
      <MenuBar
        handleOpenDialogue={handleOpenDialogue}
        setPayload={setPayload}
      />
      <Tasks
        open={open}
        closeModal={closeModal}
        keyresult={selectedKeyresult}
        setPayload={setPayload}
      />
      <Tabs
        style={{ width: "100%" }}
        // centered
        tabBarStyle={{ color: "#37561b" }}
        size="small"
        type="card"
        defaultActiveKey={getCurrentQuarter().toString()}
      >
        <TabPane tab="First Quarter" key="1">
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              overflowX: "scroll",
              overflowY: "scroll",
              overflow: "auto",
            }}
          >
            <Quarter
              deleteKeyresult={deleteKeyresult}
              deleteObjective={deleteObjective}
              setPayload={setPayload}
              payload={payload}
              objective={objective}
              keyResult={keyResult}
              editObjective={editObjective}
              editkeyResult={editkeyResult}
              activeCardId={activeCardId}
              progressBtn={progressBtn}
              hideProgressBtn={hideProgressBtn}
              openModal={openModal}
              showAddObjective={showAddObjective}
              hideAddObjective={hideAddObjective}
              showAddKeyresult={showAddKeyresult}
              hideAddKeyresult={hideAddKeyresult}
              showEditKeyresult={showEditKeyresult}
              hideEditKeyresult={hideEditKeyresult}
              showEditObjective={showEditObjective}
              hideEditObjective={hideEditObjective}
              objectives={[...payload.filter((r) => r.quarter === 1)]}
              loading={loading}
              svg={svg}
            />
          </div>
        </TabPane>
        <TabPane tab="Second Quarter" key="2">
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              overflowX: "scroll",
              overflowY: "scroll",
              overflow: "auto",
            }}
          >
            <Quarter
              deleteKeyresult={deleteKeyresult}
              deleteObjective={deleteObjective}
              objective={objective}
              setPayload={setPayload}
              payload={payload}
              keyResult={keyResult}
              editObjective={editObjective}
              editkeyResult={editkeyResult}
              activeCardId={activeCardId}
              progressBtn={progressBtn}
              hideProgressBtn={hideProgressBtn}
              openModal={openModal}
              showAddObjective={showAddObjective}
              hideAddObjective={hideAddObjective}
              showAddKeyresult={showAddKeyresult}
              hideAddKeyresult={hideAddKeyresult}
              showEditKeyresult={showEditKeyresult}
              hideEditKeyresult={hideEditKeyresult}
              showEditObjective={showEditObjective}
              hideEditObjective={hideEditObjective}
              objectives={[...payload.filter((r) => r.quarter === 2)]}
              loading={loading}
              svg={svg}
            />
          </div>
        </TabPane>
        <TabPane tab="Third Quarter" key="3">
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              overflowX: "scroll",
              overflowY: "scroll",
              overflow: "auto",
            }}
          >
            <Quarter
              deleteKeyresult={deleteKeyresult}
              deleteObjective={deleteObjective}
              setPayload={setPayload}
              payload={payload}
              objective={objective}
              keyResult={keyResult}
              editObjective={editObjective}
              editkeyResult={editkeyResult}
              activeCardId={activeCardId}
              progressBtn={progressBtn}
              hideProgressBtn={hideProgressBtn}
              openModal={openModal}
              showAddObjective={showAddObjective}
              hideAddObjective={hideAddObjective}
              showAddKeyresult={showAddKeyresult}
              hideAddKeyresult={hideAddKeyresult}
              showEditKeyresult={showEditKeyresult}
              hideEditKeyresult={hideEditKeyresult}
              showEditObjective={showEditObjective}
              hideEditObjective={hideEditObjective}
              objectives={[...payload.filter((r) => r.quarter === 3)]}
              loading={loading}
              svg={svg}
            />
          </div>
        </TabPane>
        <TabPane tab="Fourth Quarter" key="4">
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              overflowX: "scroll",
              overflowY: "scroll",
              overflow: "auto",
            }}
          >
            <Quarter
              deleteKeyresult={deleteKeyresult}
              deleteObjective={deleteObjective}
              objective={objective}
              keyResult={keyResult}
              setPayload={setPayload}
              payload={payload}
              editObjective={editObjective}
              editkeyResult={editkeyResult}
              activeCardId={activeCardId}
              progressBtn={progressBtn}
              hideProgressBtn={hideProgressBtn}
              openModal={openModal}
              showAddObjective={showAddObjective}
              hideAddObjective={hideAddObjective}
              showAddKeyresult={showAddKeyresult}
              hideAddKeyresult={hideAddKeyresult}
              showEditKeyresult={showEditKeyresult}
              hideEditKeyresult={hideEditKeyresult}
              showEditObjective={showEditObjective}
              hideEditObjective={hideEditObjective}
              objectives={[...payload.filter((r) => r.quarter === 4)]}
              loading={loading}
              svg={svg}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default withRouter(OKROverview);
