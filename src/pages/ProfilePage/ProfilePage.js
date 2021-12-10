import React, { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";

function ProfilePage() {
  const data = [
    { option: "Recycled materials", id: 1 },
    { option: "Organic materials", id: 2 },
    { option: "Made locally", id: 3 },
    { option: "Made ethically", id: 4 },
    { option: "Cruelty-free", id: 5 },
    { option: "Second-hand", id: 6 },
  ];

  const [options] = useState(data);

  return (
    <div>
      <h1>Profile Page</h1>
      {/* <select multiple value={"somt"}>
        <option value="organic-materials">Organic Materials</option>
      </select>
        <option value="organic-materials">Organic Materials</option> */}

      {/* <option label="recycledMaterials" value="recycled-materials" />
            <option label="madeLocally" value="made-locally" />
            <option label="ethicallyMade" value="made-ethically" />
            <option label="crueltyFree" value="cruelty-free" />
            <option label="vintageSecondHand" value="second-hand" /> */}

      {/* <Multiselect options={options} displayValue={option} /> */}
    </div>
  );
}

export default ProfilePage;
