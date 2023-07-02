import React from 'react';
import * as Styles from './styles';
import * as AppConfig from '../../AppConfig';
import Person2Icon from '@mui/icons-material/Person2';
import * as CommonStyles from '../../commonStyles';

export const RoomListItem = (): JSX.Element => {
    return (
        <Styles.RoomListItemContainer>
            <Styles.RoomListItemHeader>
                <h3>PlaceHolder Name</h3>
                <Styles.CreatorImage src={`${AppConfig.GetConfig().apiUrl}Users/${"ca3cb892-6527-432a-b6f8-e95b57d73e09"}/image`} />
            </Styles.RoomListItemHeader>
            <Styles.RoomListActionBar>
                <Styles.CountUserContainer><Person2Icon /> 100</Styles.CountUserContainer>
                <CommonStyles.GenericButton>Join</CommonStyles.GenericButton>
            </Styles.RoomListActionBar>
        </Styles.RoomListItemContainer>
    )
};