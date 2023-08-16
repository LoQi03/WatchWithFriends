import React from 'react';
import * as Styles from './styles';
import { VideoDto } from '../../models/videoDto';

interface PlayListProps {
    videos: VideoDto[] | undefined;
};

export const PlayList = (props: PlayListProps): JSX.Element => {


    return (
        <>
            {
                < Styles.PlayListContainer >
                    <Styles.PlayList>
                        {props.videos?.map((video: VideoDto) => {
                            return (
                                <Styles.PlayListItem key={video.id}>
                                    <Styles.PlayListItemImage src={video.image} alt={video.title} />
                                    <Styles.PlayListItemTitle>{video.title}</Styles.PlayListItemTitle>
                                    <Styles.PlayListItemDelete />
                                </Styles.PlayListItem>
                            );
                        })}
                    </Styles.PlayList>
                </Styles.PlayListContainer >
            }
        </>
    );
}