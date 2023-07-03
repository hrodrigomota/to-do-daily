import { ActivityDescription } from "@/components/ActivityDescription";
import { Button } from "@/components/Button";
import { Wrapper } from "@/components/Wrapper";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IconEdit, IconSun, IconMoon } from "@tabler/icons-react";
import { Modal } from "@/components/Modal";
import ReactSwitch from "react-switch";
import Head from "next/head";

interface ActivitiesList {
  id: string;
  description: string;
  done: boolean;
}

export default function Home() {
  const [activity, setActivity] = useState<string>("");
  const [activityList, setActivityList] = useState<ActivitiesList[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalId, setModalId] = useState<string>("");
  const [editedActivity, setEditedActivity] = useState<string>("");
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    setActivityList(() => {
      const storedActivities = localStorage.getItem("activities");
      if (!storedActivities) return [];
      return JSON.parse(storedActivities);
    });

    setDarkTheme(() => {
      const storedTheme = localStorage.getItem("theme");
      if (!storedTheme) return false;
      return JSON.parse(storedTheme);
    });
  }, []);

  function toggleTheme() {
    setDarkTheme((prevState) => !prevState);
    localStorage.setItem("theme", JSON.stringify(!darkTheme));
  }

  function handleAddActivityClick() {
    if (activity == "") {
      alert("Digite uma atividade no campo indicado");
      return;
    }

    const newActivity = {
      id: uuidv4(),
      description: activity,
      done: false,
    };

    setActivityList((prevState) => {
      const newState = [...prevState, newActivity];
      localStorage.setItem("activities", JSON.stringify(newState));
      return newState;
    });
    setActivity("");
  }

  function toggleActivityStatus(id: string) {
    setActivityList((prevState) => {
      const newState = prevState.map((activity) => {
        if (activity.id !== id) {
          return activity;
        } else {
          return { ...activity, done: !activity.done };
        }
      });
      localStorage.setItem("activities", JSON.stringify(newState));
      return newState;
    });
  }

  function saveChange() {
    setActivityList((prevState) => {
      const newState = prevState.map((activity) => {
        if (activity.id !== modalId) {
          return activity;
        } else {
          return { ...activity, description: editedActivity };
        }
      });
      localStorage.setItem("activities", JSON.stringify(newState));
      return newState;
    });

    setEditedActivity("");
    setOpenModal(false);
  }

  function removeActivity(id: string) {
    setActivityList((prevState) => {
      const newState = prevState.filter((activity) => activity.id !== id);
      localStorage.setItem("activities", JSON.stringify(newState));
      return newState;
    });
  }

  return (
    <>
      <Head>
        <title>To Do Daily</title>
        <meta
          name="description"
          content="To Do Daily te auxilia na organização do seu dia!"
        />
        <meta
          name="keywords"
          content="Checklist, To-do, Organização, Organize"
        />
      </Head>
      <div
        className={`flex flex-col items-center h-screen text-sm sm:text-base ${
          darkTheme ? "bg-black" : "bg-inherit"
        }`}
      >
        <h1
          className={`w-screen flex justify-center p-2 text-center ${
            darkTheme
              ? "bg-black text-purple-600 border-b border-purple-600"
              : "bg-purple-600 text-white"
          }`}
        >
          To Do Daily <IconEdit strokeWidth={1} />
        </h1>
        <div className="w-4/5 py-6 flex justify-between items-center">
          <h2 className={` ${darkTheme ? "text-white" : "bg-inherit"}`}>
            Data: {new Date().toLocaleDateString("pt-br")}
          </h2>
          <ReactSwitch
            onChange={toggleTheme}
            checked={darkTheme}
            onColor="#9333ea"
            offColor="#000000"
            activeBoxShadow="0 0 2px 3px #9333ea"
            checkedIcon={<IconSun size={28} color="white" />}
            uncheckedIcon={<IconMoon size={28} color="white" />}
          />
        </div>
        <Wrapper>
          <div className="flex flex-col w-full gap-2 sm:flex-row sm:justify-between sm:gap-5 py-5 mb-6 ">
            <input
              type="text"
              placeholder="Digite aqui a sua atividade..."
              onChange={(event) => setActivity(event.target.value)}
              value={activity}
              className={`break-words break-all w-full sm:w-5/6 border rounded-lg px-3 py-2 outline-none focus:border-purple-600 ${
                darkTheme ? "bg-zinc-900 text-white" : "bg-inherit text-inherit"
              }`}
            />
            <Button
              title="Adicionar"
              theme={darkTheme}
              onClick={handleAddActivityClick}
            />
          </div>
          {activityList.map((activity) => (
            <ActivityDescription
              key={activity.id}
              description={activity.description}
              id={activity.id}
              theme={darkTheme}
              editActivity={() => {
                setOpenModal(true);
                setModalId(() => activity.id);
              }}
              removeActivity={removeActivity}
              value={activity.done}
              toggleStatus={() => toggleActivityStatus(activity.id)}
            />
          ))}
        </Wrapper>
        <Modal
          id={modalId}
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          onChange={(event) => setEditedActivity(event.target.value)}
          value={editedActivity}
          saveChangeModal={saveChange}
          theme={darkTheme}
        />
      </div>
    </>
  );
}
