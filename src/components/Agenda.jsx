import React, { useState } from "react";
import { currentDateToLocalTime } from "../utils/formatDate";

let todaysDateDisplay = new Date().toDateString();

function Agenda({ taskList }) {
  const [checked, setChecked] = useState({});

  const handleChecked = (id) => {
    if (checked[id]) {
      let newChecked = { ...checked };
      delete newChecked[id];
      setChecked(newChecked);
    } else {
      setChecked({ ...checked, [id]: true });
    }
  };

  // let month =
  //   new Date().getMonth() + 1 < 10
  //     ? "0" + (new Date().getMonth() + 1)
  //     : new Date().getMonth() + 1;
  // let date =
  //   new Date().getDate() < 10
  //     ? "0" + new Date().getDate()
  //     : new Date().getDate();
  // const todaysDate = new Date().getFullYear() + "-" + month + "-" + date;

  const todaysDate = currentDateToLocalTime();

  const todaysTask = taskList.filter(
    (t) => t.scheduled && t.scheduled.substring(0, 10) === todaysDate
  );

  return (
    <div className="agendaC component">
      <h1>{todaysDateDisplay}</h1>

      {todaysTask.length <= 0 ? (
        <p>No tasks scheduled for today, go to tasks page to schedule...</p>
      ) : (
        todaysTask.map((t) => (
          <div
            key={t._id}
            className={
              checked[t._id]
                ? "agenda-list complete input-group  "
                : "agenda-list incomplete input-group  "
            }
          >
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input type="checkbox" onChange={() => handleChecked(t._id)} />
              </div>
            </div>
            <div className="form-control"> {t.title}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default Agenda;
