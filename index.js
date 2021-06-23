{
  wrap: function() {

  },
  init: function(elevators, floors) {
    let hellevators = new Set()

    Movable.prototype.makeSureNotBusy = () => { }
    Elevator.prototype._userEntering = Elevator.prototype._userEntering ?? Elevator.prototype.userEntering
    Elevator.prototype.userEntering = function (user) {
      console.log('userEntering', this)
      // this.MAXSPEED = Infinity
      // this.ACCELERATION = Infinity
      // this.DECELERATION = Infinity
      hellevators.add(this)

      return this._userEntering(user)
    }

    const teleport = (floorNum) => {
      const handleHellevator = (hellevator) => {
        if (hellevator.isBusy()) {
          return requestAnimationFrame(() => handleHellevator(hellevator))
        }
        hellevator.goToFloor(floorNum)
        hellevator.y = hellevator.destinationY
      }

      hellevators.forEach(handleHellevator)
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
  },
}