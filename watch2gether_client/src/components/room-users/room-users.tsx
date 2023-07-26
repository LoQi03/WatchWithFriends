import { UserDto } from "../../models/userDto";
import * as Styles from './styles';
import * as AppConfig from '../../AppConfig';

export interface RoomUsersProps {
    users: UserDto[]
};

export const RoomUsers = (props: RoomUsersProps): JSX.Element => {
    return (
        <Styles.RoomUsersContainer>
            {
                props.users && props.users.map((user, index) => <Styles.UserImageContainer key={index}>
                    <Styles.UserImage src={`${AppConfig.GetConfig().apiUrl}Users/${user.id}/image`} />
                    <Styles.UserName>{user.name}</Styles.UserName>
                </Styles.UserImageContainer>)
            }
        </Styles.RoomUsersContainer>
    )
};