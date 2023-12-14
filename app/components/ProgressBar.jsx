export default function ProgressBar(currentStepIndex, stepsLength) {
    let progressPercentage = Math.round(
        ((currentStepIndex + 1) / stepsLength) * 100
        ); // Takes the current step index (+1) and divides it by the total amount of steps, then multiplies it by 100 to get the percentage, and rounds it to the nearest integer

    return (
        <div className={"my-4 rounded-full h-full w-3 bg-grey-medium overflow-hidden"}>
            <div style={{ height: `${progressPercentage}%` }} className="my-4 w-full rounded-full transition-all duration-1000 overflow-hidden bg-red-medium">

            </div>
        </div>
    );

}