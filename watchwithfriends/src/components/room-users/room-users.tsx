import * as Styles from './styles';
import * as AppConfig from '../../AppConfig';
import { AuthContext } from "../../services/authenticationContext";
import { useContext } from "react";
import { UserDTO } from '../../api';

export interface RoomUsersProps {
    users: UserDTO[]
};

export const RoomUsers = (props: RoomUsersProps): JSX.Element => {
    const authContext = useContext(AuthContext);
    return (
        <Styles.RoomUsersContainer>
            <Styles.CurrentUserContainer>
                <Styles.UserImage src={`${AppConfig.getConfig().apiUrl}Users/get-image/`+ authContext?.currentUser?.id} />
            </Styles.CurrentUserContainer>
            {
                props.users && props.users.filter(x => x.id !== authContext?.currentUser?.id).map((user, index) =>
                    <Styles.UserImage key={index} src={`${AppConfig.getConfig().apiUrl}Users/get-image/${user.id}`} />
                )
            }
        </Styles.RoomUsersContainer>
    )
};