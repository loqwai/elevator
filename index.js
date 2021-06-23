{
    wrap: function() {

    },
    init: function(elevators, floors) {
        let elevator

        Elevator.prototype._userEntering = Elevator.prototype._userEntering ?? Elevator.prototype.userEntering
        Elevator.prototype.userEntering = function (user) {
            console.log('userEntering', this)
            // this.MAXSPEED = Infinity
            // this.ACCELERATION = Infinity
            // this.DECELERATION = Infinity
            elevator = this
            return this._userEntering(user)
        }

        const teleport = (floorNum) => {
            console.log('teleport')
            if (!elevator) return

            if (elevator.isBusy()) {
                console.log('busy')
                return requestAnimationFrame(() => teleport(floorNum))
            }

            console.log('elevator', elevator)
            elevator.goToFloor(floorNum)
            elevator.y = elevator.destinationY
        }

        floors.forEach(floor => {
            floor.on('up_button_pressed', () => teleport(floor.floorNum()))
            floor.on('down_button_pressed', () => teleport(floor.floorNum()))
        })

        elevators.forEach(e => {
            e.on('floor_button_pressed', teleport)
        })

    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}