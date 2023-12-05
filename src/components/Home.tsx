import { IRes, useCustomProduct } from "./Hooks";
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Home.scss";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const Home = () => {
  const [loadMore, setLoadMore] = useState(true);
  const pod = useCustomProduct(loadMore);

  const [text, setText] = useState("");
  const [status, setStatus] = useState("Any");
  const [userList, setUserList] = useState<IRes[] | undefined>(pod);

  useEffect(() => {
    if (loadMore && pod.length > 0) {
      setUserList(pod);
      setLoadMore(false);
    }
  }, [pod]);

  useEffect(() => {
    const parent = document.getElementById("parentId");
    parent?.addEventListener("scroll", onScroll);
    return () => parent?.removeEventListener("scroll", onScroll);
  }, []);


  const onScroll = (e: any) => {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      setLoadMore(true);
    }
  };

  const handleOnClick = (e: any) => {
    const findUser =
      pod && pod?.length > 0
        ? pod?.filter((u) => u.name.toLocaleLowerCase().includes(e))
        : undefined;

    setText(e);
    setUserList(findUser);
  };

  const handleChange = (e: any) => {
    if (e === "Any") 
        setUserList(pod);
    else {
      const findUser =
        pod && pod?.length > 0
          ? pod?.filter((u) => u.status.includes(e))
          : undefined;

      setUserList(findUser);
    }
    setStatus(e);
  };

  return (
    <div
      id="parentId"
      style={{ height: "calc(100vh - 16px)", overflow: "auto" }}
    >
      <div className="searchDiv">
        <TextField
          className="search"
          id="outlined-basic"
          label="search"
          variant="outlined"
          type="text"
          placeholder="search"
          value={text}
          onChange={(e) => {
            handleOnClick(e.target.value);
          }}
        />
      </div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Character status</FormLabel>
        <RadioGroup
          style={{ display: "flex", flexDirection: "row" }}
          aria-label="gender"
          name="gender1"
          value={status}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        >
          <FormControlLabel value="Any" control={<Radio />} label="Any" />
          <FormControlLabel value="Alive" control={<Radio />} label="Alive" />
          <FormControlLabel value="Dead" control={<Radio />} label="Dead" />
          <FormControlLabel
            value="unknown"
            control={<Radio />}
            label="Unknown"
          />
        </RadioGroup>
      </FormControl>

      <div className="okvir">
        {userList &&
          userList?.length > 0 &&
          userList?.map((user) => {
            return (
              <div className="cart" key={user.id}>
                <img className="image" src={user.image} />
                <p className="name">{user.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
