import React, { useContext } from 'react';
import { AuthContext } from '../../../services/authenticationContext';
import * as Styles from './styles';
import * as AppConfig from '../../../AppConfig';
import { Tooltip } from '@mui/material';
import { ChatEntryDto } from '../../../models/chatEntryDto';

export interface ChatEntryProps {
    chatEntry: ChatEntryDto
};

export const ChatEntry = (props: ChatEntryProps): JSX.Element => {
    const authContext = useContext(AuthContext);
    const isCurrentUser = authContext?.currentUser?.id === props.chatEntry.userId;


    return (
        <>
            {
                isCurrentUser ?
                    <>
                        <Styles.ChatEntryContainer isCurrentUser={isCurrentUser}>
                            <Styles.ChatEntryContent isCurrentUser={isCurrentUser}>
                                {props.chatEntry.message}
                            </Styles.ChatEntryContent>
                            <Tooltip arrow={true} placement='right' title={props.chatEntry.name + ' | ' + props.chatEntry.messageTime}>
                                <Styles.ChatEntryImage src={`${AppConfig.GetConfig().apiUrl}Users/${props.chatEntry.userId}/image`} />
                            </Tooltip>
                        </Styles.ChatEntryContainer>
                    </>
                    :
                    <>
                        <Styles.ChatEntryContainer isCurrentUser={isCurrentUser}>
                            <Tooltip arrow={true} placement='left' title={props.chatEntry.name + ' | ' + props.chatEntry.messageTime}>
                                <Styles.ChatEntryImage src={`${AppConfig.GetConfig().apiUrl}Users/${props.chatEntry.userId}/image`} />
                            </Tooltip>
                            <Styles.ChatEntryContent isCurrentUser={isCurrentUser}>
                                {props.chatEntry.message}
                            </Styles.ChatEntryContent>
                        </Styles.ChatEntryContainer>
                    </>

            }
        </>
    )
};