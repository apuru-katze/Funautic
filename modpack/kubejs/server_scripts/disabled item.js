ServerEvents.recipes(event => {
    event.remove({ output: 'tracks:small_track_drive_wheel' })
    event.remove({ output: 'tracks:small_suspension_track' })
    event.remove({ output: 'tracks:track_mount' })
})