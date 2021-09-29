import React, { Component, MouseEvent } from 'react';

/**Import certain Material UI for better UI */
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Container from '@mui/material/Container';

/**
 * Import VideoPlayer component for youtube video playing
 */
import VideoPlayer from '../components/videoPlayer/videoPlayer';
type Props = {
    message: string;
};

type State = {
    url: string;
    shouldPlayVideo: boolean;
    videoId: string;
    isInValidUrl: boolean;
};

export class HomePage extends Component<Props, State>{
    state: State = {
        url: '',
        shouldPlayVideo: false,
        videoId: '',
        isInValidUrl: false 
    }

    /**
     * 
     * @param e Assign the url entered by users
     */
    handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ url: e.target.value });
    }

    /**
     * Validate if the youtube url is correct, and has the an id
     * If the url is not proper, set bools to display error message
     * else play the video 
     */
    handlePlayRequest = (e: MouseEvent) => {
        const { url } = this.state;
        if (url.includes('youtube.com') && url.includes('v=') && url.indexOf("http")===0) {
            this.setState({ videoId: url.split('=')[1], shouldPlayVideo: true, isInValidUrl: false })
        } else {
            this.setState({ isInValidUrl: true })
        }
    }

    handleEditRequest = (e: MouseEvent) => {
        this.setState({ videoId: '', shouldPlayVideo: false, isInValidUrl: false, url: '' })
    }

    /**
     * Form for user to 
     * 1. Enter the desired URL
     * 2. Play and Edit button
     */
    renderUrlForm = () => {
        const { shouldPlayVideo, url, isInValidUrl } = this.state;
        return (
            <Paper elevation={1} sx={{
                backgroundColor: '#ebe5e5'
            }}>
                <Grid container justifyContent="center" alignItems='center'>
                    <Grid item xs={10} style={{ padding: '1em' }}>
                        <TextField style={{ width: '100%' }} required label="Let us know a youtube video URL you wish to play." variant="filled" value={url} onChange={this.handleUrlChange} />
                        {isInValidUrl && <FormHelperText style={{'color': 'red'}}>Please enter a valid Youtube URL.</FormHelperText>}
                    </Grid>
                    <Grid item xs={2} style={{ padding: '1em' }}>
                        <Button variant="contained" onClick={!!shouldPlayVideo ? this.handleEditRequest : this.handlePlayRequest}>{!!shouldPlayVideo ? 'Edit' : 'Play'}</Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    render() {
        const { videoId, shouldPlayVideo } = this.state;
        return (
            <Paper elevation={1} sx={{
                backgroundColor: '#ebe5e5'
            }}>
                <Container fixed maxWidth="md" sx={{
                    backgroundColor: '#ebe5e5'
                }}>
                    {this.renderUrlForm()}
                    <br />
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <VideoPlayer videoId={videoId} start={!!shouldPlayVideo ? 1 : 0} />
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        )
    }
}
