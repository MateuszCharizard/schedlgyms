import { useState, useEffect } from "react";

const workouts = ["Bench Press", "Squat", "Deadlift", "Pull-ups", "Push-ups", "Rows", "Overhead Press"];
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function GymScheduler() {
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    const savedSchedule = JSON.parse(localStorage.getItem("gymSchedule")) || {};
    setSchedule(savedSchedule);
  }, []);

  useEffect(() => {
    localStorage.setItem("gymSchedule", JSON.stringify(schedule));
  }, [schedule]);

  const addWorkout = (day, workout) => {
    setSchedule((prev) => {
      const updatedDay = prev[day] ? [...prev[day], { workout, completed: false, weight: "" }] : [{ workout, completed: false, weight: "" }];
      return { ...prev, [day]: updatedDay };
    });
  };

  const toggleCompletion = (day, index) => {
    setSchedule((prev) => {
      const updatedDay = prev[day].map((task, i) => i === index ? { ...task, completed: !task.completed } : task);
      return { ...prev, [day]: updatedDay };
    });
  };

  const updateWeight = (day, index, weight) => {
    setSchedule((prev) => {
      const updatedDay = prev[day].map((task, i) => i === index ? { ...task, weight } : task);
      return { ...prev, [day]: updatedDay };
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gym Scheduler</h1>
      {daysOfWeek.map((day) => (
        <div key={day} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{day}</h2>
          <select onChange={(e) => addWorkout(day, e.target.value)} className="border p-2 rounded">
            <option value="">Add Workout</option>
            {workouts.map((workout) => (
              <option key={workout} value={workout}>{workout}</option>
            ))}
          </select>
          <ul className="mt-2">
            {schedule[day]?.map((task, index) => (
              <li key={index} className="flex items-center gap-4 p-2 border rounded mt-2">
                <input type="checkbox" checked={task.completed} onChange={() => toggleCompletion(day, index)} />
                <span className={task.completed ? "line-through" : ""}>{task.workout}</span>
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={task.weight}
                  onChange={(e) => updateWeight(day, index, e.target.value)}
                  className="border p-1 w-20"
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}