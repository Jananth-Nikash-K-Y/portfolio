import json
import tempfile
import pyttsx3
import base64

def handler(event, context):
    try:
        # Parse the request body
        body = json.loads(event['body'])
        text = body['text']
        
        # Initialize text-to-speech engine
        engine = pyttsx3.init()
        
        # Create a temporary file for the audio
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as tf:
            # Save speech to the temporary file
            engine.save_to_file(text, tf.name)
            engine.runAndWait()
            
            # Read the audio file
            tf.seek(0)
            audio_bytes = tf.read()
            
            # Convert to base64 for sending in JSON
            audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            'body': json.dumps({
                'audio': audio_base64,
                'format': 'wav'
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            'body': json.dumps({'error': str(e)})
        } 