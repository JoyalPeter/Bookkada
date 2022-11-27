import * as React from "react";
import ProfileModule from "../components/profile/ProfileModule";

export interface IAppProps {}

export default function ProfilePage(props: IAppProps) {
  return (
    <div>
      <ProfileModule />
    </div>
  );
}
