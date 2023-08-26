import { UserDto } from "../../models/userDto";
import * as Styles from './styles';
import * as AppConfig from '../../AppConfig';
import { AuthContext } from "../../services/authenticationContext";
import { useContext } from "react";

export interface RoomUsersProps {
    users: UserDto[]
};

export const RoomUsers = (props: RoomUsersProps): JSX.Element => {
    const authContext = useContext(AuthContext);
    return (
        <Styles.RoomUsersContainer>
            <Styles.CurrentUserContainer>
                <Styles.UserImage src={`${AppConfig.GetConfig().apiUrl}Users/${authContext?.currentUser?.id}/image`} />
            </Styles.CurrentUserContainer>
            {
                props.users && props.users.filter(x => x.id !== authContext?.currentUser?.id).map((user, index) =>
                    <Styles.UserImage key={index} src={`${AppConfig.GetConfig().apiUrl}Users/${user.id}/image`} />
                )
            }
        </Styles.RoomUsersContainer>
    )
};